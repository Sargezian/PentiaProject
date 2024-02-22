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
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={currentMessage}
                    onChangeText={setCurrentMessage}
                    placeholder="Type a message"
                />
                <TouchableOpacity >
                    <Image
                        source={require('../../assets/image.png')}
                        style={styles.imageButton}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={sendMessage} style={styles.imageButtonContainer}>
                <Image
                    source={require('../../assets/send.png')}
                    style={styles.sendButton}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    sendInputMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        marginHorizontal: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    input: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        padding: 10,
        marginLeft: 10,
        backgroundColor: '#f5f5f5',
    },
    imageButtonContainer: {
        padding: 10,
    },


    imageButton: {
        width: 40,
        height: 40,
        marginHorizontal: 5,

    },

    sendButton: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
});

export default SendMessage;
