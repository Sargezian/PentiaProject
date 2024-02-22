import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { MessageListProps, Message } from '../../Types/MessageTypes.ts';

const MessageList: React.FC<MessageListProps> = ({ messages, formatDate }) => {
    const renderItem = ({ item }: { item: Message }) => (
        <View style={styles.messageContainer}>
            <Image source={require('../../assets/user.png')} style={styles.avatar} />
            <View style={styles.messageColumn}>
                <View style={styles.messageHolder}>
                    <Text style={styles.name}>{item.name}</Text>
                    {item.text ? <Text style={styles.messageText}>{item.text}</Text> : null}
                    {item.imageUrl ? (
                        <Image source={{ uri: item.imageUrl }} style={styles.messageImage} />
                    ) : null}
                </View>
                <Text style={styles.dateText}>{formatDate(item.date)}</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
        />
    );
};
const styles = StyleSheet.create({
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
    messageImage: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 10,
    },
    dateText: {
        marginTop: 5,
    },
});

export default MessageList;
