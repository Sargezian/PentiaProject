import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import database from '@react-native-firebase/database';
import {useAuth} from '../../config/AuthContext.tsx';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../Types/navigationTypes.ts';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>;


type SendMessageProps = {
    onSend: (message: { text?: string; imageUrl?: string }) => Promise<void>;
};

const SendMessage: React.FC<SendMessageProps> = ({ onSend }) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const { userInfo} = useAuth();

    const route = useRoute<ChatScreenRouteProp>();
    const { chatRoomId } = route.params;

    const requestNotificationPermission = async () => {
        const result = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        if (result === RESULTS.GRANTED) {
            return true;
        } else {
            const requestResult = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
            return requestResult === RESULTS.GRANTED;
        }
    };

    const handleSend = async (messageContent: { text?: string; imageUrl?: string }) => {
        const hasPermission = await requestNotificationPermission();
        if (hasPermission) {
            Alert.alert(
                'Enable Notifications',
                'Would you like to receive notifications for new messages in this room?',
                [
                    {
                        text: 'No',
                        onPress: () => {
                            console.log('User denied room notifications');
                            saveUserNotificationPreference(false);
                        },
                        style: 'cancel',
                    },
                    {
                        text: 'Yes',
                        onPress: async () => {
                            await onSend(messageContent);
                            saveUserNotificationPreference(true);
                            if (messageContent.text) setCurrentMessage('');
                        },
                    },
                ]
            );
        } else {
            Alert.alert('Notification Permission Denied', "You won't receive notifications for new messages in this room.");
        }
    };

    const saveUserNotificationPreference = (prefersNotifications: boolean) => {
        const userId = userInfo?.id;
        if (!userId) {
            console.log('User ID not found.');
            return;
        }

        database()
            .ref(`/users/${chatRoomId}/${userId}`)
            .update({
                prefersNotifications,
            })
            .then(() => console.log('User notification preference updated.'))
            .catch((error) => console.error('Error updating user notification preference:', error));
    };

    const uploadImageAndSendMessage = async () => {
        ImagePicker.openPicker({
            cropping: false,
        }).then(async (image) => {
            const imgName = image.path.substring(image.path.lastIndexOf('/') + 1);
            const newName = `${Date.now()}_${imgName}`;
            const reference = storage().ref(`Images/${newName}`);

            await reference.putFile(image.path);
            const url = await reference.getDownloadURL();
            await handleSend({imageUrl: url});
        }).catch((error) => {
            console.log(error);
            Alert.alert('Error', 'Could not select image.');
        });
    };

    const handleSendMessage = async () => {
        if (currentMessage.trim()) {
            await handleSend({text: currentMessage});
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
                <TouchableOpacity onPress={() => uploadImageAndSendMessage()}>
                    <Image source={require('../../assets/camera.png')} style={styles.cameraButton} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => uploadImageAndSendMessage()}>
                    <Image source={require('../../assets/image.png')} style={styles.imageButton} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleSendMessage()} style={styles.imageButtonContainer}>
                <Image source={require('../../assets/send.png')} style={styles.sendButton} />
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
    cameraButton: {
        width: 45,
        height: 45,
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
