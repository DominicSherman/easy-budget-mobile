import TestRenderer from 'react-test-renderer';
import React from 'react';
import Touchable from 'react-native-platform-touchable';

import {chance} from '../../chance';
import Toggle from '../../../src/components/generic/Toggle';
import {Color} from '../../../src/constants/color';

jest.mock('../../../src/utils/hooks');

describe('Toggle', () => {
    let expectedProps,
        root;

    const render = (): void => {
        root = TestRenderer.create(
            <Toggle {...expectedProps} />
        ).root;
    };

    beforeEach(() => {
        expectedProps = {
            checked: chance.bool(),
            color: chance.pickone(Object.values(Color)),
            onChange: jest.fn(),
            title: chance.string()
        };

        render();
    });

    it('should call onChange when the touchable is pressed', () => {
        const renderedTouchable = root.findByType(Touchable);

        renderedTouchable.props.onPress();

        expect(expectedProps.onChange).toHaveBeenCalledTimes(1);
        expect(expectedProps.onChange).toHaveBeenCalledWith(!expectedProps.checked);
    });
});
