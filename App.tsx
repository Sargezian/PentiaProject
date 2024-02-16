import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '861870448695-4rla4cu3ein47nq64563e0npo7vv1o6n.apps.googleusercontent.com',
});

interface UserInfo {
  id: string;
  email: string;
  givenName: string | null;
  familyName: string | null;
}

function App(): React.ReactElement {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isInProgress, setIsInProgress] = useState<boolean>(false);

  const signIn = async () => {
    try {
      setIsInProgress(true);
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);

      setUserInfo({
        id: userCredential.user.uid,
        email: result.user.email,
        givenName: result.user.givenName || '',
        familyName: result.user.familyName || '',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsInProgress(false);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
      setUserInfo(null); // Resets user info upon sign out
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.text}>Hello, {userInfo?.givenName || 'Guest'}</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={isInProgress}
      />
      <Button title="Sign Out" onPress={signOut} disabled={!userInfo} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 20,
  },
});

export default App;
