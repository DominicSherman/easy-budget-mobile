import TestRenderer from 'react-test-renderer';
import React from 'react';
import {Text} from 'react-native';

import DefaultText from '../../../src/components/generic/DefaultText';
import {chance} from '../../chance';

describe('DefaultText', () => {
    const expectedChildren = chance.string();

    const {root} = TestRenderer.create(
        <DefaultText>
            {expectedChildren}
        </DefaultText>
    );

    it('should render a Text component', () => {
        expect(root.findByType(Text).props.children).toBe(expectedChildren);
    });
});
