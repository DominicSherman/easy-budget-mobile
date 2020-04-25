import {act} from 'react-test-renderer';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import Login from '../../src/screens/Login';
import {signIn} from '../../src/services/auth-service';

jest.mock('../../src/services/auth-service');
jest.mock('../../src/utils/hooks');

describe('Login', () => {
    const {getByTestId} = render(<Login />);

    it('should render a GoogleSigninButton', async () => {
        const renderedSignIn = getByTestId('signInButton');

        await act(async () => {
            await fireEvent.press(renderedSignIn);
        });

        expect(signIn).toHaveBeenCalledTimes(1);
    });
});
