import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { useAuth } from '../../config/AuthContext.tsx';


const ChatRoomWelcomeText = () => {
    const { userInfo} = useAuth();


    return (
        <View style={styles.WelcomeContainer}>
            <Text style={styles.WelcomeText}>Welcome {userInfo?.givenName || 'Guest'}</Text>
        </View>
    );
};

export default ChatRoomWelcomeText;


const styles = StyleSheet.create({
    WelcomeContainer: {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 30,
        padding: 15,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 20},
        shadowRadius: 8,

    },

    WelcomeText: {
        fontSize: 28,
        fontWeight: 'bold',

    },


});
