import TestRenderer from 'react-test-renderer';
import React from 'react';

import Information from '../../src/screens/Information';

describe('Information', () => {
    let expectedProps,
        root;

    const render = (): void => {
        root = TestRenderer.create(
            <Information {...expectedProps} />
        ).root;
    };

    beforeEach(() => {
        expectedProps = {};

        render();
    });
});
