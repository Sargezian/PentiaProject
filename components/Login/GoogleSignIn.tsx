import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useAuth } from '../../config/AuthContext.tsx';

const GoogleSignIn = () => {
    const { signInWithGoogle, isInProgress } = useAuth();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => signInWithGoogle()}
                disabled={isInProgress}
            >
                <Image
                    source={require('../../assets/google.png')} // Adjust the path as necessary
                    style={styles.icon}
                />
                <Text style={styles.buttonText}>Sign In With Google</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GoogleSignIn;

const styles = StyleSheet.create({
    container: {
        marginVertical: 14,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 8,
        paddingLeft: 12,
        paddingRight: 32,
        borderWidth: 1,
        borderColor: '#ebebeb',
    },
    icon: {
        width: 40,
        height: 40,
    },
    buttonText: {
        fontSize: 18,
        color: '#757575',
        marginLeft: 10,
        lineHeight: 26,
        fontWeight: '600',
    },
});
