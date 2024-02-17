import React, { createContext, useContext, ReactNode, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

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

    const signInWithGoogle = async () => {
        try {
            setIsInProgress(true);
            await GoogleSignin.hasPlayServices();
            const result = await GoogleSignin.signIn();

            const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
            const userCredential = await auth().signInWithCredential(googleCredential);

            setUserInfo({
                id: userCredential.user.uid,
                email: result.user.email,
                givenName: result.user.givenName || '',
                familyName: result.user.familyName || '',
            });
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

            setUserInfo({
                id: userCredential.user.uid,
                email: userCredential.user.email || '',
                givenName: userCredential.user.displayName || '',
                familyName: '', // Facebook does not provide family name separately
            });
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
            await GoogleSignin.signOut(); // For Google sign out
            // There is no specific sign out method for Facebook in react-native-fbsdk-next
            setUserInfo(null);
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
