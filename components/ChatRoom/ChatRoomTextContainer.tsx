import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ChatRoom = () => {

    return (
        <View style={styles.JoinRoomContainer}>
            <Text style={styles.JoinRoomText}>Join a room to chat</Text>
        </View>
    );
};

export default ChatRoom;


const styles = StyleSheet.create({

    JoinRoomContainer: {
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

    JoinRoomText: {
        fontSize: 28,
        fontWeight: 'bold',
    },

});
