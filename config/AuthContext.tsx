import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import { UserInfo } from '../Types/UserInfo'; // Ensure paths are correct
import { AuthContextType } from '../Types/AuthContextType'; // Ensure paths are correct

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [isInProgress, setIsInProgress] = useState<boolean>(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const storedUserInfo = await AsyncStorage.getItem('userInfo');
            if (storedUserInfo) {
                setUserInfo(JSON.parse(storedUserInfo));
            }
        };
        checkLoginStatus();
    }, []);

    const saveFCMTokenToDatabase = async (userId: string) => {
        const currentToken = await messaging().getToken();
        if (currentToken) {
            console.log('FCM Token:', currentToken);
            await database()
                .ref(`/user_tokens/${userId}`)
                .set({token: currentToken});
        } else {
            console.log('No registration token available. Request permission to generate one.');
        }
    };

    const signInWithGoogle = async () => {
        setIsInProgress(true);
        try {
            await GoogleSignin.hasPlayServices();
            const result = await GoogleSignin.signIn();

            const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
            const userCredential = await auth().signInWithCredential(googleCredential);
            const userInfo: UserInfo = {
                id: userCredential.user.uid,
                email: result.user.email,
                givenName: result.user.givenName || '',
                familyName: result.user.familyName || '',
            };
            setUserInfo(userInfo);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            await saveFCMTokenToDatabase(userInfo.id);
        } catch (error) {
            console.error(error);
        } finally {
            setIsInProgress(false);
        }
    };

    const signInWithFacebook = async () => {
        setIsInProgress(true);
        try {
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                throw new Error('User cancelled the login process');
            }

            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                throw new Error('Something went wrong obtaining access token');
            }

            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
            const userCredential = await auth().signInWithCredential(facebookCredential);
            const userInfo: UserInfo = {
                id: userCredential.user.uid,
                email: userCredential.user.email || '',
                givenName: userCredential.user.displayName || '',
                familyName: '',
            };
            setUserInfo(userInfo);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            await saveFCMTokenToDatabase(userInfo.id);
        } catch (error) {
            console.error(error);
        } finally {
            setIsInProgress(false);
        }
    };

    const signOut = async () => {
        setIsInProgress(true);
        try {
            await auth().signOut();
            await GoogleSignin.signOut();
            setUserInfo(null);
            await AsyncStorage.removeItem('userInfo');
            // Consider also removing the FCM token from the database here
        } catch (error) {
            console.error(error);
        } finally {
            setIsInProgress(false);
        }
    };

    return (
        <AuthContext.Provider value={{ userInfo, signInWithGoogle, signInWithFacebook, signOut, isInProgress }}>
            {children}
        </AuthContext.Provider>
    );
};
