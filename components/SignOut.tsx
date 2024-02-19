import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../config/AuthContext.tsx';

const SignOut = () => {
    const { signOut } = useAuth();

    return (
        <TouchableOpacity onPress={signOut}>
            <View>
                <Image source={require('../assets/logout.png')} style={{ width: 22.5, height: 22.5 }} />
            </View>
        </TouchableOpacity>
    );
};

export default SignOut;
