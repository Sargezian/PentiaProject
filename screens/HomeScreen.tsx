import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../config/AuthContext.tsx';

const HomeScreen = () => {
    const { userInfo} = useAuth();

    return (
        <View style={styles.container}>
            <Text>Hello, {userInfo?.givenName || 'Guest'}</Text>
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

export default HomeScreen;

