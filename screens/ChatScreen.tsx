import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import database from '@react-native-firebase/database';
import { AuthContext } from '../config/AuthContext';
import MessageList from '../components/MessageRoom/MessageList.tsx';
import SendMessage from '../components/MessageRoom/SendMessage.tsx';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import {RootStackParamList} from '../Types/navigationTypes.ts';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>;

type Message = {
    name: string;
    text: string;
    date: number;
    imageUrl?: string;
};

const ChatScreen = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('AuthContext is not available');
    }
    const { userInfo } = authContext;

    const route = useRoute<ChatScreenRouteProp>();
    const { chatRoomId } = route.params;

    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const messagesRef = database().ref(`/messages/${chatRoomId}`);
        const onReceiveMessage = messagesRef.on('value', snapshot => {
            const fetchedMessages = snapshot.val() ? Object.values(snapshot.val()) : [];
            // Assert the fetched messages as an array of Message objects
            const sortedMessages = (fetchedMessages as Message[]).sort((a, b) => a.date - b.date);
            setMessages(sortedMessages);
        });

        return () => messagesRef.off('value', onReceiveMessage);
    }, [chatRoomId]);

    const sendMessage = async (message: { text?: string; imageUrl?: string }) => {
        if (!message.text && !message.imageUrl) return;

        const messageData = {
            name: userInfo?.givenName || 'Unknown',
            text: message.text,
            imageUrl: message.imageUrl,
            date: Date.now(),
        };

        await database().ref(`/messages/${chatRoomId}`).push(messageData);
    };


    // Function to format the date
    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 80}
        >
                <ImageBackground
                    source={require('../assets/MessageBg.png')}
                    style={styles.imageBackground}
                    resizeMode="cover"
                >
                    <MessageList messages={messages} formatDate={formatDate} />
                    <SendMessage
                        onSend={sendMessage}
                    />
                </ImageBackground>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
});


export default ChatScreen;
