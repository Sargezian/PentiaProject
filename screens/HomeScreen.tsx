import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../Types/navigationTypes.ts';

const HomeScreen = () => {

    const navigation = useNavigation<HomeScreenNavigationProp>();
    const NavigateToChatRoomPress = () => {
        navigation.navigate('ChatScreen');
    };

    return (
        <ImageBackground
            source={require('../assets/CloudBg.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.itemContainer}>
                <TouchableOpacity
                    onPress={() => NavigateToChatRoomPress()}
                >
                    <View style={styles.room}>
                        <View style={styles.roomContainer}>
                            <Image source={require('../assets/music.png')} style={styles.roomImage}/>
                            <View style={styles.roomColumn}>
                                <Text style={styles.title}>Music</Text>
                                <Text>A room to discuss all type of music</Text>
                            </View>
                        </View>
                        <Image source={require('../assets/right-chevron.png')} style={styles.chevronIcon}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.room}>
                        <View style={styles.roomContainer}>
                            <Image source={require('../assets/religions.png')} style={styles.roomImage}/>
                            <View style={styles.roomColumn}>
                                <Text style={styles.title}>Religion</Text>
                                <Text>Discuss the many faiths of humanity</Text>
                            </View>
                        </View>
                        <Image source={require('../assets/right-chevron.png')} style={styles.chevronIcon}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.room}>
                        <View style={styles.roomContainer}>
                            <Image source={require('../assets/parenting.png')} style={styles.roomImage}/>
                            <View style={styles.roomColumn}>
                                <Text style={styles.title}>Parenting</Text>
                                <Text>Talk about parenting</Text>
                            </View>
                        </View>
                        <Image source={require('../assets/right-chevron.png')} style={styles.chevronIcon}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.room}>
                        <View style={styles.roomContainer}>
                            <Image source={require('../assets/animal.png')} style={styles.roomImage}/>
                            <View style={styles.roomColumn}>
                                <Text style={styles.title}>Animals</Text>
                                <Text>Talk about Pets and Animals</Text>
                            </View>
                        </View>
                        <Image source={require('../assets/right-chevron.png')} style={styles.chevronIcon}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.room}>
                        <View style={styles.roomContainer}>
                            <Image source={require('../assets/sports.png')} style={styles.roomImage}/>
                            <View style={styles.roomColumn}>
                                <Text style={styles.title}>Sports</Text>
                                <Text>A place to talk about all kind of Sports </Text>
                            </View>
                        </View>
                        <Image source={require('../assets/right-chevron.png')} style={styles.chevronIcon}/>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.JoinRoomContainer}>
                <Text style={styles.JoinRoomText}>Join a room to chat</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    WelcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    itemContainer: {
        flex: 1,
        width: '100%',
        marginTop: 40,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 60,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 30},
        shadowRadius: 8,
    },

    room: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
        justifyContent: 'space-between',
        paddingVertical: 12,
        marginHorizontal: 12,
    },
    roomColumn: {
        flexDirection: 'column',
    },
    chevronIcon: {
        width: 50,
        height: 50,
    },
    roomImage: {
        marginHorizontal: 8,
        width: 50,
        height: 50,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    roomContainer: {
        flexDirection: 'row',
    },

    JoinRoomContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 40,
        padding: 15,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: {width: 0, height: 20},
        shadowRadius: 8,
        marginVertical: 50,

    },

    JoinRoomText: {
        fontSize: 28,
        fontWeight: 'bold',
    },

});

export default HomeScreen;
