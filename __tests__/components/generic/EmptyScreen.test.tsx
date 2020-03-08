import TestRenderer from 'react-test-renderer';
import React from 'react';
import {ScrollView} from 'react-native';

import EmptyScreen from '../../../src/components/generic/EmptyScreen';
import {chance} from '../../chance';

jest.mock('../../../src/redux/hooks');

describe('EmptyScreen', () => {
    let root,
        expectedProps;

    const render = (): void => {
        root = TestRenderer.create(
            <EmptyScreen {...expectedProps} />
        ).root;
    };

    beforeEach(() => {
        expectedProps = {
            onPressSubText: jest.fn(),
            subText: chance.string(),
            titleText: chance.string()
        };

        render();
    });

    it('should render a ScrollView', () => {
        root.findByType(ScrollView);
    });
});
