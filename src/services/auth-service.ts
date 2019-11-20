import {LayoutRoot, Navigation} from 'react-native-navigation';
import {GoogleSignin} from '@react-native-community/google-signin';
import firebase from 'react-native-firebase';

import {getLoggedInRootLayout, getLoggedOutRootLayout} from '../helpers/navigation-helpers';

export const signIn = async () => {
    try {
        await GoogleSignin.configure();
        const data = await GoogleSignin.signIn();
        const credential = firebase.auth.GoogleAuthProvider.credential(
            data.idToken
        );

        await firebase
            .auth()
            .signInWithCredential(credential);

        await Navigation.setRoot(getLoggedInRootLayout());
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

export const signOut = async () => {
    try {
        await GoogleSignin.signOut();

        await Navigation.setRoot(getLoggedOutRootLayout());
    } catch (error) {
        // eslint-disable-next-line no-console
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
