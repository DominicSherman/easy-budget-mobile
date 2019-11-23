import TestRenderer from 'react-test-renderer';
import React from 'react';
import {TextInput} from 'react-native';

import DefaultTextInput from '../../../src/components/generic/DefaultTextInput';
import {chance} from '../../chance';

describe('DefaultTextInput', () => {
    const expectedChildren = chance.string();

    const {root} = TestRenderer.create(
        <DefaultTextInput>
            {expectedChildren}
        </DefaultTextInput>
    );

    it('should render a TextInput component', () => {
        expect(root.findByType(TextInput).props.children).toBe(expectedChildren);
    });
});
