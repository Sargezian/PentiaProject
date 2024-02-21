import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

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
            <View style={styles.button}>
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default SendMessage;