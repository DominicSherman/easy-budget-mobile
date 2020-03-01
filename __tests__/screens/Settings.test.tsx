import TestRenderer from 'react-test-renderer';
import React from 'react';
import {SafeAreaView} from 'react-native';

import * as hooks from '../../src/redux/hooks';
import Settings from '../../src/screens/Settings';
import {createRandomUserInformation} from '../models';

jest.mock('react-redux');
jest.mock('../../src/redux/hooks');

describe('Settings', () => {
    const {useUserInformation} = hooks as jest.Mocked<typeof hooks>;

    let root;

    const render = (): void => {
        root = TestRenderer.create(<Settings />).root;
    };

    beforeEach(() => {
        useUserInformation.mockReturnValue(createRandomUserInformation());

        render();
    });

    it('should render a safe area view', () => {
        root.findByType(SafeAreaView);
    });
});
