import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ChatScreen = () => {
    return (
        <View style={styles.container}>
           <Text> chat room</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

});

export default ChatScreen;
