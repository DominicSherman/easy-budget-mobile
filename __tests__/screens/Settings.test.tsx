import TestRenderer from 'react-test-renderer';
import React from 'react';
import {SafeAreaView} from 'react-native';

import Settings from '../../src/screens/Settings';

describe('Settings', () => {
    let root;

    const render = (): void => {
        root = TestRenderer.create(<Settings />).root;
    };

    beforeEach(() => {
        render();
    });

    it('should render a safe area view', () => {
        root.findByType(SafeAreaView);
    });
});
