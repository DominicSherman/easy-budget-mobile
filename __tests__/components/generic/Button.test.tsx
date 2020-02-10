import TestRenderer from 'react-test-renderer';
import React from 'react';
import {ActivityIndicator} from 'react-native';

import {chance} from '../../chance';
import {RegularText} from '../../../src/components/generic/Text';
import Button from '../../../src/components/generic/Button';

describe('Button', () => {
    let expectedProps,
        root;

    const render = (): void => {
        root = TestRenderer.create(
            <Button {...expectedProps} />
        ).root;
    };

    beforeEach(() => {
        expectedProps = {
            disabled: chance.bool(),
            loading: false,
            onPress: jest.fn(),
            text: chance.string()
        };

        render();
    });

    it('should render text if loading is false', () => {
        const renderedText = root.findByType(RegularText);

        expect(renderedText.props.children).toBe(expectedProps.text);
    });

    it('should render loading if loading is true', () => {
        expectedProps.loading = true;
        render();

        root.findByType(ActivityIndicator);
    });
});
