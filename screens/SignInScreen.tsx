// src/SignInScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoogleSignInButton from '../components/GoogleSignInButton.tsx';

const SignInScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Sign In Screen</Text>
            <GoogleSignInButton />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SignInScreen;
