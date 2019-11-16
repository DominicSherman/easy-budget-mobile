import {getLoggedInRootLayout, getLoggedOutRootLayout} from './layout-factory';
import {LayoutRoot, Navigation} from 'react-native-navigation';
import {GoogleSignin} from '@react-native-community/google-signin';
import firebase from 'react-native-firebase';

export const signIn = async () => {
  try {
    await GoogleSignin.configure();
    const data = await GoogleSignin.signIn();
    console.log('data', data);
    const credential = firebase.auth.GoogleAuthProvider.credential(
      data.idToken,
    );
    const firebaseUserCredential = await firebase
      .auth()
      .signInWithCredential(credential);

    console.log('firebaseUserCredential', firebaseUserCredential);

    await Navigation.setRoot(getLoggedInRootLayout());
  } catch (e) {
    console.error(e);
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.signOut();

    await Navigation.setRoot(getLoggedOutRootLayout());
  } catch (error) {
    console.error(error);
  }
};

export const getUserId = () => firebase.auth().currentUser?.uid || '';

export const getRoot = async (): Promise<LayoutRoot> => {
  const isSignedIn = await GoogleSignin.isSignedIn();

  if (isSignedIn) {
    return getLoggedInRootLayout();
  }

  return getLoggedOutRootLayout();
};
