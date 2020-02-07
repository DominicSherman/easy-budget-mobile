import {GoogleSignin} from '@react-native-community/google-signin';
import firebase from 'react-native-firebase';

import {setAppState} from '../redux/action-creators';

export const signIn = async (): Promise<void> => {
    await GoogleSignin.configure({
        webClientId: '507817004856-aivthrdc9634dd3j5coibbvsikbj4v2i.apps.googleusercontent.com'
    });

    const data = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken
    );

    await firebase
        .auth()
        .signInWithCredential(credential);

    setAppState();
};

export const signOut = async (): Promise<void> => {
    await GoogleSignin.signOut();
    setAppState();
};

export const getUserId = (): string => firebase.auth().currentUser?.uid || '';

export const getIsSignedIn = (): Promise<boolean> => GoogleSignin.isSignedIn();
