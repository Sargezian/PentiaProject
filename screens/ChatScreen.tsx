import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import database from '@react-native-firebase/database';
import { AuthContext } from '../config/AuthContext';
import MessageList from '../components/MessageRoom/MessageList.tsx';
import SendMessage from '../components/MessageRoom/SendMessage.tsx';

type Message = {
    name: string;
    text: string;
    date: number;
};

const ChatScreen = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('AuthContext is not available');
    }
    const { userInfo } = authContext;

    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const messagesRef = database().ref('/messages');
        const onReceiveMessage = messagesRef.on('value', snapshot => {
            const fetchedMessages = snapshot.val() ? Object.values(snapshot.val()) : [];
            // Assert the fetched messages as an array of Message objects
            const sortedMessages = (fetchedMessages as Message[]).sort((a, b) => a.date - b.date);
            setMessages(sortedMessages);
        });

        return () => messagesRef.off('value', onReceiveMessage);
    }, []);

    const sendMessage = async () => {
        if (currentMessage.trim() === '') return;

        const messageData = {
            name: userInfo?.givenName || 'Unknown',
            text: currentMessage,
            date: Date.now(),
        };

        await database().ref('/messages').push(messageData);
        setCurrentMessage('');
    };

    // Function to format the date
    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    };

    return (
        <ImageBackground
            source={require('../assets/MessageBg.png')}
            style={styles.imageBackground}
            resizeMode="cover"
        >
            <MessageList messages={messages} formatDate={formatDate} />
            <SendMessage
                currentMessage={currentMessage}
                setCurrentMessage={setCurrentMessage}
                sendMessage={sendMessage}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
});


export default ChatScreen;
