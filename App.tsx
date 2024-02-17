import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './config/AuthContext.tsx';
import SignInScreen from './screens/SignInScreen.tsx';
import HomeScreen from './screens/HomeScreen.tsx';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createNativeStackNavigator();

GoogleSignin.configure({
    webClientId: '861870448695-4rla4cu3ein47nq64563e0npo7vv1o6n.apps.googleusercontent.com',
});


const AppStack = () => {
  const { userInfo } = useAuth();

  return (
      <Stack.Navigator>
        {userInfo ? (
            <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
            <Stack.Screen name="SignIn" component={SignInScreen} />
        )}
      </Stack.Navigator>
  );
};

const App = () => {
  return (
      <NavigationContainer>
        <AuthProvider>
          <AppStack />
        </AuthProvider>
      </NavigationContainer>
  );
};

export default App;
