import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    HomeScreen: undefined;
    SignIn: undefined;
    ChatScreen: { chatRoomId: string };
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;
