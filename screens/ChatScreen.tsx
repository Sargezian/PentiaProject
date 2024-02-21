import React, { useEffect, useState, useContext } from 'react';
import {View, StyleSheet, Text, TextInput, Button, FlatList, Image, ImageBackground} from 'react-native';
import database from '@react-native-firebase/database';
import { AuthContext } from '../config/AuthContext';

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
            setMessages(fetchedMessages as Message[]);
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
            <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <Image source={require('../assets/user.png')} style={styles.avatar} />
                        <View style={styles.messageColumn}>
                            <View style={styles.messageHolder}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.messageText}>{`${item.text}`}</Text>
                            </View>
                            <Text>{`${formatDate(item.date)}`}</Text>
                        </View>
                    </View>
                )}
            />
            <View style={styles.sendInputMessage}>
                <TextInput
                    style={styles.input}
                    value={currentMessage}
                    onChangeText={setCurrentMessage}
                    placeholder="Type a message"
                />
                <View style={styles.button}>
                    <Button title="Send" onPress={sendMessage} />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageBackground: {
        flex: 1,
    },

    messageContainer: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
    },
    messageColumn: {
        flexDirection: 'column',
    },
    messageHolder: {
        backgroundColor: '#e3e3e3',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        padding: 10,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.50,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 20,
        marginRight: 10,
    },
    name: {
        fontWeight: 'bold',
    },

    messageText: {
        fontSize: 16,
    },

    sendInputMessage: {
        flexDirection: 'row',
    },

    input: {
        flex: 0.75,
        height: 50,
        marginBottom: 40,
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#f5f5f5',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
    },

    button: {
        flex: 0.25,
        height: 50,
        marginBottom: 40,
        borderRadius: 10,
        marginHorizontal: 10,
    },

});


export default ChatScreen;
