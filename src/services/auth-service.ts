import {GoogleSignin, User} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

import {setAppState} from '../redux/action-creators';

export const configureGoogle = async (): Promise<void> => {
    await GoogleSignin.configure({
        webClientId: '507817004856-aivthrdc9634dd3j5coibbvsikbj4v2i.apps.googleusercontent.com'
    });
};

export const signIn = async (): Promise<void> => {
    await configureGoogle();

    const data = await GoogleSignin.signIn();
    const credential = auth.GoogleAuthProvider.credential(
        data.idToken
    );

    await auth()
        .signInWithCredential(credential);

    setAppState();
};

export const signOut = async (): Promise<void> => {
    await GoogleSignin.signOut();
    setAppState();
};

export const getUserId = (): string => auth().currentUser?.uid || '';

export const getIsSignedIn = (): Promise<boolean> => GoogleSignin.isSignedIn();

export const signInSilently = async (): Promise<User | null> => {
    await configureGoogle();

    return GoogleSignin.signInSilently();
};
