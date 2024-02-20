import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    HomeScreen: undefined;
    SignIn: undefined;
    ChatScreen: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HomeScreen'>;
