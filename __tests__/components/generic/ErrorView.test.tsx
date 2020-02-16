import TestRenderer from 'react-test-renderer';
import React from 'react';

import ErrorView from '../../../src/components/generic/ErrorView';

jest.mock('../../../src/redux/hooks');

describe('ErrorView', () => {
    let testInstance;

    const render = (): void => {
        const testRenderer = TestRenderer.create(<ErrorView />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        render();
    });

    it('should render error text', () => {
        testInstance.findByProps({children: '🤒 Whoops! Something went wrong. 🤕'});
    });
});
