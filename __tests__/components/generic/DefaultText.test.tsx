import TestRenderer from 'react-test-renderer';
import React from 'react';
import {Text} from 'react-native';

import {RegularText} from '../../../src/components/generic/Text';
import {chance} from '../../chance';

describe('DefaultText', () => {
    const expectedChildren = chance.string();

    const {root} = TestRenderer.create(
        <RegularText>
            {expectedChildren}
        </RegularText>
    );

    it('should render a Text component', () => {
        expect(root.findByType(Text).props.children).toBe(expectedChildren);
    });
});
