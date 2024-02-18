import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import GoogleSignIn from '../components/GoogleSignIn.tsx';
import FacebookSignIn from '../components/FacebookSignIn.tsx';

const SignInScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.containerHolder}>
                <Image source={require('../assets/SignInLogo.png')} style={styles.image} />
                <FacebookSignIn />
                <GoogleSignIn />
             </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerHolder: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginBottom: 30,
        width: 300,
        height: 340,
    },
});

export default SignInScreen;
