import TestRenderer from 'react-test-renderer';
import React from 'react';
import Touchable from 'react-native-platform-touchable';

import Home from '../../src/screens/Home';
import {signOut} from '../../src/services/auth-service';

jest.mock('../../src/services/auth-service');

describe('Home', () => {
    const {root} = TestRenderer.create(
        <Home />
    );

    it('should render a Touchable to log out', () => {
        const renderedTouchable = root.findByType(Touchable);

        expect(renderedTouchable.props.onPress).toBe(signOut);
    });
});
