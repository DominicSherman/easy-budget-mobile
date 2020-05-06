import {act} from 'react-test-renderer';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import Login from '../../src/screens/Login';
import {signIn} from '../../src/services/auth-service';
import {chance} from '../chance';

jest.mock('../../src/services/auth-service');
jest.mock('../../src/utils/hooks');

describe('Login', () => {
    it('should render a GoogleSigninButton', async () => {
        const {getByTestId} = render(<Login />);
        const renderedSignIn = getByTestId('signInButton');

        await act(async () => {
            await fireEvent.press(renderedSignIn);
        });

        expect(signIn).toHaveBeenCalledTimes(1);
    });

    it('should set loading to false if sign in errors out', async () => {
        // @ts-ignore
        signIn.mockRejectedValue(new Error(chance.string()));

        const {getByTestId} = render(<Login />);
        const renderedSignIn = getByTestId('signInButton');

        await act(async () => {
            await fireEvent.press(renderedSignIn);
        });

        getByTestId('signInButton');
    });
});
