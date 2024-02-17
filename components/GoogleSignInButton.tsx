import React from 'react';
import { GoogleSigninButton as RNGoogleSignInButton } from '@react-native-google-signin/google-signin';
import { useAuth } from '../config/AuthContext';

const GoogleSignInComponent = () => {
    const { signIn, isInProgress } = useAuth();

    return (
        <RNGoogleSignInButton
            size={RNGoogleSignInButton.Size.Wide}
            color={RNGoogleSignInButton.Color.Dark}
            onPress={() => signIn()}
            disabled={isInProgress}
        />
    );
};

export default GoogleSignInComponent;
