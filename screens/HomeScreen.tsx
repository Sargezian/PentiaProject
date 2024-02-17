import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../config/AuthContext.tsx';

const HomeScreen = () => {
    const { userInfo, signOut } = useAuth();

    return (
        <View style={styles.container}>
            <Text>Hello, {userInfo?.givenName || 'Guest'}</Text>
            <Button title="Sign Out" onPress={signOut} />
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
