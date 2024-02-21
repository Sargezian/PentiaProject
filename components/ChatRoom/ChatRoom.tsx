import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../../Types/navigationTypes.ts';

const ChatRoom = () => {

    const navigation = useNavigation<HomeScreenNavigationProp>();
    const NavigateToChatRoomPress = (chatRoomId: string) => {
        navigation.navigate('ChatScreen', { chatRoomId });
    };

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress={() => NavigateToChatRoomPress('Music')}
            >
                <View style={styles.room}>
                    <View style={styles.roomContainer}>
                        <Image source={require('../../assets/music.png')} style={styles.roomImage}/>
                        <View style={styles.roomColumn}>
                            <Text style={styles.title}>Music</Text>
                            <Text style={styles.description}>A room to discuss all type of music</Text>
                        </View>
                    </View>
                    <Image source={require('../../assets/right-chevron.png')} style={styles.chevronIcon}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => NavigateToChatRoomPress('Religion')}
            >
                <View style={styles.room}>
                    <View style={styles.roomContainer}>
                        <Image source={require('../../assets/religions.png')} style={styles.roomImage}/>
                        <View style={styles.roomColumn}>
                            <Text style={styles.title}>Religion</Text>
                            <Text style={styles.description}>Discuss the many faiths of humanity</Text>
                        </View>
                    </View>
                    <Image source={require('../../assets/right-chevron.png')} style={styles.chevronIcon}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => NavigateToChatRoomPress('Parenting')}
            >
                <View style={styles.room}>
                    <View style={styles.roomContainer}>
                        <Image source={require('../../assets/parenting.png')} style={styles.roomImage}/>
                        <View style={styles.roomColumn}>
                            <Text style={styles.title}>Parenting</Text>
                            <Text style={styles.description}>Talk about parenting</Text>
                        </View>
                    </View>
                    <Image source={require('../../assets/right-chevron.png')} style={styles.chevronIcon}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => NavigateToChatRoomPress('Animals')}
            >
                <View style={styles.room}>
                    <View style={styles.roomContainer}>
                        <Image source={require('../../assets/animal.png')} style={styles.roomImage}/>
                        <View style={styles.roomColumn}>
                            <Text style={styles.title}>Animals</Text>
                            <Text style={styles.description}>Talk about Pets and Animals</Text>
                        </View>
                    </View>
                    <Image source={require('../../assets/right-chevron.png')} style={styles.chevronIcon}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => NavigateToChatRoomPress('Sports')}
            >
                <View style={styles.room}>
                    <View style={styles.roomContainer}>
                        <Image source={require('../../assets/sports.png')} style={styles.roomImage}/>
                        <View style={styles.roomColumn}>
                            <Text style={styles.title}>Sports</Text>
                            <Text style={styles.description}>A place to talk about all kind of Sports </Text>
                        </View>
                    </View>
                    <Image source={require('../../assets/right-chevron.png')} style={styles.chevronIcon}/>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ChatRoom;


const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 60,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 30},
        shadowRadius: 8,
        paddingVertical: 8,
    },

    room: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        marginHorizontal: 12,
        marginVertical: 12,
    },
    roomColumn: {
        flexDirection: 'column',
    },
    chevronIcon: {
        width: 40,
        height: 40,
    },
    roomImage: {
        marginHorizontal: 8,
        width: 40,
        height: 40,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    description: {
        fontSize: 14,
    },

    roomContainer: {
        flexDirection: 'row',
    },
});
