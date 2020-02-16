import TestRenderer from 'react-test-renderer';
import React from 'react';
import {ActivityIndicator} from 'react-native';

import LoadingView from '../../../src/components/generic/LoadingView';

jest.mock('../../../src/redux/hooks');

describe('LoadingView', () => {
    let testInstance;

    const render = (): void => {
        const testRenderer = TestRenderer.create(<LoadingView />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        render();
    });

    it('should render an activity indicator', () => {
        testInstance.findByType(ActivityIndicator);
    });
});
