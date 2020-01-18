import {Navigation} from 'react-native-navigation';
import {GoogleSignin} from '@react-native-community/google-signin';
import firebase from 'react-native-firebase';

import {getLoggedInRootLayout, getLoggedOutRootLayout} from '../utils/navigation-utils';

export const signIn = async (): Promise<void> => {
    await GoogleSignin.configure();
    const data = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken
    );

    await firebase
        .auth()
        .signInWithCredential(credential);

    await Navigation.setRoot(getLoggedInRootLayout());
};

export const signOut = async (): Promise<void> => {
    await GoogleSignin.signOut();

    await Navigation.setRoot(getLoggedOutRootLayout());
};

export const getUserId = (): string => firebase.auth().currentUser?.uid || '';

export const getIsSignedIn = (): Promise<boolean> => GoogleSignin.isSignedIn();
