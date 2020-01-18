import TestRenderer from 'react-test-renderer';
import React from 'react';
import {TextInput} from 'react-native';

import Input from '../../../src/components/generic/Input';
import {chance} from '../../chance';

describe('Input', () => {
    let testInstance,
        expectedProps;

    const render = (): void => {
        const testRenderer = TestRenderer.create(<Input {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        expectedProps = {
            onChange: jest.fn(),
            title: chance.string(),
            value: chance.string()
        };
        render();
    });

    it('should render a text input', () => {
        const renderedInput = testInstance.findByType(TextInput);

        expect(renderedInput.props.onChangeText).toEqual(expectedProps.onChange);
    });
});
