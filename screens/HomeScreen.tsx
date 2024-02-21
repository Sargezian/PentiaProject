import React from 'react';
import {StyleSheet, ImageBackground, View} from 'react-native';
import ChatRoom from '../components/ChatRoom/ChatRoom.tsx';
import ChatRoomTextContainer from '../components/ChatRoom/ChatRoomTextContainer.tsx';
import ChatRoomWelcomeText from '../components/ChatRoom/ChatRoomWelcomeText.tsx';

const HomeScreen = () => {

    return (
        <ImageBackground
            source={require('../assets/CloudBg.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.chatRoomWelcomeText}>
                <ChatRoomWelcomeText/>
            </View>

            <View style={styles.chatRoom}>
                <ChatRoom/>
            </View>

            <View style={styles.chatRoomText}>
                <ChatRoomTextContainer/>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    chatRoomWelcomeText: {
        flex: 0.40,
        justifyContent: 'center',
        flexDirection: 'column',
    },

    chatRoom: {
        flex: 1.50,
        flexDirection: 'column',
    },
    chatRoomText: {
        flex: 0.40,
        justifyContent: 'center',
    },
});

export default HomeScreen;
