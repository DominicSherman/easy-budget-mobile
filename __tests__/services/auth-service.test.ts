import {GoogleSignin} from '@react-native-community/google-signin';
import {Navigation} from 'react-native-navigation';
import * as firebase from 'react-native-firebase';

import {getIsSignedIn, getUserId, signIn, signOut} from '../../src/services/auth-service';
import {chance} from '../chance';
import * as navigationHelpers from '../../src/utils/navigation-utils';

jest.mock('react-native-navigation', () => ({
    Navigation: {
        setRoot: jest.fn()
    }
}));
jest.mock('../../src/utils/navigation-utils');

describe('auth service', () => {
    const mockGoogleSignin = GoogleSignin as jest.Mocked<typeof GoogleSignin>;
    const {getLoggedInRootLayout, getLoggedOutRootLayout} = navigationHelpers as jest.Mocked<typeof navigationHelpers>;
    const {auth} = firebase as jest.Mocked<typeof firebase>;

    let expectedLoggedInLayout,
        expectedLoggedOutLayout;

    beforeEach(() => {
        expectedLoggedInLayout = {
            [chance.string()]: chance.string()
        };
        expectedLoggedOutLayout = {
            [chance.string()]: chance.string()
        };

        getLoggedInRootLayout.mockReturnValue(expectedLoggedInLayout);
        getLoggedOutRootLayout.mockReturnValue(expectedLoggedOutLayout);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('signIn', () => {
        let expectedData,
            expectedCredential,
            signInWithCredentialSpy;

        beforeEach(() => {
            expectedData = {
                idToken: chance.string()
            };
            expectedCredential = chance.string();
            signInWithCredentialSpy = jest.fn();

            // @ts-ignore
            auth.mockReturnValue({
                signInWithCredential: signInWithCredentialSpy
            });
            // @ts-ignore
            auth.GoogleAuthProvider.credential.mockReturnValue(expectedCredential);
            mockGoogleSignin.signIn.mockResolvedValue(expectedData);
        });

        it('should configure GoogleSignin', async () => {
            await signIn();

            expect(GoogleSignin.configure).toHaveBeenCalledTimes(1);
        });

        it('should call GoogleSignin to signIn', async () => {
            await signIn();

            expect(GoogleSignin.signIn).toHaveBeenCalledTimes(1);
        });

        it('should get the credential from firebase', async () => {
            await signIn();

            expect(auth.GoogleAuthProvider.credential).toHaveBeenCalledTimes(1);
            expect(auth.GoogleAuthProvider.credential).toHaveBeenCalledWith(expectedData.idToken);
        });

        it('should signIn to firebase using the credential', async () => {
            await signIn();

            expect(signInWithCredentialSpy).toHaveBeenCalledTimes(1);
            expect(signInWithCredentialSpy).toHaveBeenCalledWith(expectedCredential);
        });

        it('should set logged in root', async () => {
            await signIn();

            expect(Navigation.setRoot).toHaveBeenCalledTimes(1);
            expect(Navigation.setRoot).toHaveBeenCalledWith(expectedLoggedInLayout);
        });
    });

    describe('signOut', () => {
        it('should call signOut', async () => {
            await signOut();

            expect(GoogleSignin.signOut).toHaveBeenCalledTimes(1);
        });

        it('should call setRoot', async () => {
            await signOut();

            expect(Navigation.setRoot).toHaveBeenCalledTimes(1);
            expect(Navigation.setRoot).toHaveBeenCalledWith(expectedLoggedOutLayout);
        });
    });

    describe('getUserId', () => {
        let expectedUser;

        beforeEach(() => {
            expectedUser = {
                uid: chance.string()
            };

            // @ts-ignore
            auth.mockReturnValue({
                currentUser: expectedUser
            });
        });

        it('should return the userId', () => {
            const actualUserId = getUserId();

            expect(actualUserId).toBe(firebase.auth().currentUser!.uid);
        });

        it('should return an empty string if current user is null', () => {
            // @ts-ignore
            auth.mockResolvedValue(null);

            const actualUserId = getUserId();

            expect(actualUserId).toBe('');
        });
    });

    describe('getIsSignedIn', () => {
        it('should return GoogleSignin.isSignedIn', () => {
            expect(getIsSignedIn()).toEqual(GoogleSignin.isSignedIn());
        });
    });
});
