import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserInfo {
    id: string;
    email: string;
    givenName: string | null;
    familyName: string | null;
}

interface AuthContextType {
    userInfo: UserInfo | null;
    signInWithGoogle: () => Promise<void>;
    signInWithFacebook: () => Promise<void>;
    signOut: () => Promise<void>;
    isInProgress: boolean;
}

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

    const signInWithGoogle = async () => {
        try {
            setIsInProgress(true);
            await GoogleSignin.hasPlayServices();
            const result = await GoogleSignin.signIn();

            const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
            const userCredential = await auth().signInWithCredential(googleCredential);
            const userInfo = {
                id: userCredential.user.uid,
                email: result.user.email,
                givenName: result.user.givenName || '',
                familyName: result.user.familyName || '',
            };
            setUserInfo(userInfo);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        } catch (error) {
            console.error(error);
        } finally {
            setIsInProgress(false);
        }
    };

    const signInWithFacebook = async () => {
        try {
            setIsInProgress(true);
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
            const userInfo = {
                id: userCredential.user.uid,
                email: userCredential.user.email || '',
                givenName: userCredential.user.displayName || '',
                familyName: '',
            };
            setUserInfo(userInfo);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        } catch (error) {
            console.error(error);
        } finally {
            setIsInProgress(false);
        }
    };

    const signOut = async () => {
        try {
            setIsInProgress(true);
            await auth().signOut();
            await GoogleSignin.signOut();
            setUserInfo(null);
            await AsyncStorage.removeItem('userInfo');
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
