import TestRenderer from 'react-test-renderer';
import React from 'react';
import {GoogleSigninButton} from '@react-native-community/google-signin';

import Login from '../../src/screens/Login';
import {signIn} from '../../src/services/auth-service';

jest.mock('../../src/services/auth-service');

describe('Login', () => {
    const {root} = TestRenderer.create(
        <Login />
    );

    it('should render a GoogleSigninButton', () => {
        expect(root.findByType(GoogleSigninButton).props.onPress).toBe(signIn);
    });
});
