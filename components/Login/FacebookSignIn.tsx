import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useAuth } from '../../config/AuthContext.tsx';

function FacebookSignIn() {
    const { signInWithFacebook } = useAuth();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => signInWithFacebook().then(() => console.log('Signed in with Facebook!'))}>
                <Image source={require('../../assets/facebook.png')} style={styles.icon} />
                <Text style={styles.buttonText}>Sign In With Facebook</Text>
            </TouchableOpacity>
        </View>
    );
}

export default FacebookSignIn;

const styles = StyleSheet.create({
    container: {
        marginVertical: 14,
    },
    buttonText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 10,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#4267B2',
        borderWidth: 1,
        borderColor: '#4267B2',
    },
    icon: {
        width: 40,
        height: 40,
    },
});
