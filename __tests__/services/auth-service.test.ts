import {GoogleSignin} from '@react-native-community/google-signin';
import {Navigation} from 'react-native-navigation';
import * as firebase from 'react-native-firebase';

import {getUserId, signIn, signOut, getRoot} from '../../src/services/auth-service';
import {chance} from '../chance';
import * as navigationHelpers from '../../src/helpers/navigation-helpers';

jest.mock('react-native-navigation', () => ({
    Navigation: {
        setRoot: jest.fn()
    }
}));
jest.mock('../../src/helpers/navigation-helpers');

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
        let expectedData;

        beforeEach(() => {
            expectedData = {
                idToken: chance.string()
            };

            mockGoogleSignin.signIn.mockResolvedValue(expectedData);
        });

        it('should configure the signin', async () => {
            await signIn();

            expect(GoogleSignin.configure).toHaveBeenCalledTimes(1);
        });

        it('should call signIn', async () => {
            await signIn();

            expect(GoogleSignin.signIn).toHaveBeenCalledTimes(1);
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

    describe('getRoot', () => {
        it('should return the logged in layout if isSignedIn', async () => {
            mockGoogleSignin.isSignedIn.mockResolvedValue(true);

            expect(await getRoot()).toBe(expectedLoggedInLayout);
        });

        it('should return the logged out layout if **not** isSignedIn', async () => {
            mockGoogleSignin.isSignedIn.mockResolvedValue(false);

            expect(await getRoot()).toBe(expectedLoggedOutLayout);
        });
    });
});
