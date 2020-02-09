import TestRenderer from 'react-test-renderer';
import React from 'react';
import {SafeAreaView} from 'react-native';

import Account from '../../src/screens/Account';

describe('Account', () => {
    let root;

    const render = (): void => {
        root = TestRenderer.create(<Account />).root;
    };

    beforeEach(() => {
        render();
    });

    it('should render a safe area view', () => {
        root.findByType(SafeAreaView);
    });
});
