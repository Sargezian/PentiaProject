/*
import {View, StatusBar} from 'react-native';
import React from 'react';
import RoundButton from '../components/RoundButton';
import {_signInWithGoogle} from '../config/GoogleSignIn';

export default function SignInScreen({navigation}) {
  async function googleSignIn() {
    _signInWithGoogle()
      .then(data => {
        if (!data) {
          console.log('=> Error:', 'No Data');
          return;
        }
        console.log('=> Success', data);
      })
      .catch(error => {
        console.error('Sign in with Google failed', error);
      });
  }

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#fffdee'} />
      <View style={{flex: 0.5}}>
        <RoundButton onPress={() => googleSignIn()} />
      </View>
    </View>
  );
}
*/
