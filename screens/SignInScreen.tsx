// src/SignInScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GoogleSignIn from '../components/GoogleSignIn.tsx';
import FacebookSignIn from '../components/FacebookSignIn.tsx';

const SignInScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Sign In Screen</Text>
            <GoogleSignIn />
            <FacebookSignIn />
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
