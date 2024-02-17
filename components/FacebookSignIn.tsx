import React from 'react';
import { Button } from 'react-native';
import { useAuth } from '../config/AuthContext.tsx'; // Adjust the path as necessary

function FacebookSignIn() {
    const { signInWithFacebook } = useAuth();

    return (
        <Button
            title="Facebook Sign-In"
            onPress={() => signInWithFacebook().then(() => console.log('Signed in with Facebook!'))}
        />
    );
}

export default FacebookSignIn;
