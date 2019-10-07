import React from 'react';
import firebase from 'react-native-firebase';
import {
  GoogleSigninButton,
  GoogleSignin,
} from '@react-native-community/google-signin';
import {SafeAreaView} from 'react-native';
import DefaultText from '../components/DefaultText';
import {screenWrapper} from '../styles/shared-styles';

const onPress = async () => {
  try {
    // add any configuration settings here:
    await GoogleSignin.configure();

    const data = await GoogleSignin.signIn();
    console.log('data', data);

    // create a new firebase credential with the token
    const credential = firebase.auth.GoogleAuthProvider.credential(
      data.idToken,
      data.accessToken,
    );
    // login with credential
    const firebaseUserCredential = await firebase
      .auth()
      .signInWithCredential(credential);

    console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
  } catch (e) {
    console.error(e);
  }
};

const Home: React.FC = () => {
  return (
    <SafeAreaView style={screenWrapper}>
      <DefaultText>{'Home'}</DefaultText>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onPress}
      />
    </SafeAreaView>
  );
};

export default Home;
