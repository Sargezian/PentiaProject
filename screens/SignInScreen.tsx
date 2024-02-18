import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import GoogleSignIn from '../components/GoogleSignIn.tsx';
import FacebookSignIn from '../components/FacebookSignIn.tsx';

const SignInScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.containerHolderOne}>
                <Image source={require('../assets/LoginBgImage.png')} style={styles.bgImage} />
            </View>
            <View style={styles.containerHolderTwo}>
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
    },
    containerHolderOne: {
        flex: 0.75,
    },
    containerHolderTwo: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 80,
        backgroundColor: 'white',
    },
    image: {
        marginBottom: 30,
        width: 300,
        height: 340,
    },
    bgImage: {
        width: '100%',
        height: '150%',
    },
});

export default SignInScreen;
