import TestRenderer from 'react-test-renderer';
import React from 'react';
import {ScrollView} from 'react-native';

import Information, {InformationRef} from '../../src/screens/Information';

jest.mock('../../src/redux/hooks');

describe('Information', () => {
    let expectedProps,
        root;

    const render = (): void => {
        root = TestRenderer.create(
            <Information {...expectedProps} />
        ).root;
    };

    beforeEach(() => {
        expectedProps = {
            route: {
                params: {
                    ref: undefined
                }
            }
        };

        render();
    });

    it('should render a scroll view when a ref is **not** passed', () => {
        root.findByType(ScrollView);
    });

    it('should render a scroll view when a ref is passed', () => {
        expectedProps.route.params.ref = InformationRef.EXPENSE;
        render();

        root.findByType(ScrollView);
    });
});
