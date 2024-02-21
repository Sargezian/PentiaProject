import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';

type SendMessageProps = {
    currentMessage: string;
    setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
    sendMessage: () => Promise<void>;
};

const SendMessage: React.FC<SendMessageProps> = ({ currentMessage, setCurrentMessage, sendMessage }) => {
    return (
        <View style={styles.sendInputMessage}>
            <TextInput
                style={styles.input}
                value={currentMessage}
                onChangeText={setCurrentMessage}
                placeholder="Type a message"
            />
            <TouchableOpacity style={styles.button} onPress={sendMessage}>
                <Image
                    source={require('../../assets/send.png')}
                    style={styles.imageButton}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    sendInputMessage: {
        flexDirection: 'row',
    },
    input: {
        flex: 4,
        height: 50,
        marginBottom: 40,
        marginHorizontal: 10,
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
        flex: 1,
        marginBottom: 40,
    },
    imageButton: {
        width: 60,
        height: 40,
        resizeMode: 'contain',
    },
});

export default SendMessage;
