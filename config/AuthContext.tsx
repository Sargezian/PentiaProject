// src/AuthContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

interface UserInfo {
    id: string;
    email: string;
    givenName: string | null;
    familyName: string | null;
}

interface AuthContextType {
    userInfo: UserInfo | null;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
    isInProgress: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth error');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [isInProgress, setIsInProgress] = useState<boolean>(false);

    const signIn = async () => {
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

    const signOut = async () => {
        try {
            setIsInProgress(true);
            await auth().signOut();
            await GoogleSignin.signOut();
            setUserInfo(null);
        } catch (error) {
            console.error(error);
        } finally {
            setIsInProgress(false);
        }
    };

    return (
        <AuthContext.Provider value={{ userInfo, signIn, signOut, isInProgress }}>
            {children}
        </AuthContext.Provider>
    );
};
