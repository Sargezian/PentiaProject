import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './config/AuthContext.tsx';
import SignInScreen from './screens/SignInScreen.tsx';
import HomeScreen from './screens/HomeScreen.tsx';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import SplashScreen from 'react-native-splash-screen';
import {
    Platform,
} from 'react-native';
import SignOut from './components/SignOut.tsx';

const Stack = createNativeStackNavigator();

GoogleSignin.configure({
    webClientId: '861870448695-4rla4cu3ein47nq64563e0npo7vv1o6n.apps.googleusercontent.com',
});


const AppStack = () => {
  const { userInfo } = useAuth();

  return (
      <Stack.Navigator>
        {userInfo ? (
            <Stack.Screen
                name="Chat Rooms"
                component={HomeScreen}
                options={{
                    headerStyle: {
                        backgroundColor: '#0000bb',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerRight: () => <SignOut />,
                }}
            />
        ) : (
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                    headerShown: false,
                }}
                 />
        )}
      </Stack.Navigator>
  );
};

const App = () => {

    useEffect(() => {
        if (Platform.OS === 'android') SplashScreen.hide();
    }, []);

  return (
      <NavigationContainer>
        <AuthProvider>
          <AppStack />
        </AuthProvider>
      </NavigationContainer>
  );
};

export default App;
