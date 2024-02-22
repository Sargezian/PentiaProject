import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

type SendMessageProps = {
    onSend: (message: { text?: string; imageUrl?: string }) => Promise<void>;
};

const SendMessage: React.FC<SendMessageProps> = ({ onSend }) => {
    const [currentMessage, setCurrentMessage] = useState('');

    const uploadImageAndSendMessage = async () => {
        ImagePicker.openPicker({
            cropping: false,
        }).then(async (image) => {
            const imgName = image.path.substring(image.path.lastIndexOf('/') + 1);
            const newName = `${Date.now()}_${imgName}`;
            const reference = storage().ref(`Images/${newName}`);

            await reference.putFile(image.path);
            const url = await reference.getDownloadURL();

            onSend({ imageUrl: url });
            console.log('Image Picker Response: ', image);
        }).catch((error) => {
            console.log(error);
            Alert.alert('Error', 'Could not select image.');
        });
    };

    const handleSendMessage = () => {
        if (currentMessage.trim()) {
            onSend({ text: currentMessage });
            setCurrentMessage('');
        }
    };

    return (
        <View style={styles.sendInputMessage}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={currentMessage}
                    onChangeText={setCurrentMessage}
                    placeholder="Type a message"
                />
                <TouchableOpacity onPress={uploadImageAndSendMessage}>
                    <Image
                        source={require('../../assets/image.png')}
                        style={styles.imageButton}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleSendMessage} style={styles.imageButtonContainer}>
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
