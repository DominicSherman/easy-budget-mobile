import {GoogleSignin} from '@react-native-community/google-signin';
import firebase from 'react-native-firebase';

import {setActiveTimePeriodData} from '../redux/action-creators';

export const signIn = async (): Promise<void> => {
    await GoogleSignin.configure();
    const data = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken
    );

    await firebase
        .auth()
        .signInWithCredential(credential);
    await setActiveTimePeriodData();
};

export const signOut = async (): Promise<void> => {
    await GoogleSignin.signOut();
};

export const getUserId = (): string => firebase.auth().currentUser?.uid || '';

export const getIsSignedIn = (): Promise<boolean> => GoogleSignin.isSignedIn();
