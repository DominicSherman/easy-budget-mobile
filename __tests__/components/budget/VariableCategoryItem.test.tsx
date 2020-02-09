import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import Touchable from 'react-native-platform-touchable';

import {createRandomExpense, createRandomExpenses, createRandomVariableCategory} from '../../models';
import VariableCategoryItem from '../../../src/components/budget/VariableCategoryItem';
import {chance} from '../../chance';
import {easeInTransition} from '../../../src/services/animation-service';

jest.mock('../../../src/services/animation-service');

describe('VariableCategoryItem', () => {
    let root,
        expectedProps;

    const render = (): void => {
        root = TestRenderer.create(
            <VariableCategoryItem {...expectedProps} />
        ).root;
    };

    beforeEach(() => {
        const variableCategoryId = chance.guid();

        expectedProps = {
            expenses: [createRandomExpenses(), createRandomExpense({variableCategoryId})],
            variableCategory: createRandomVariableCategory({variableCategoryId})
        };

        render();
    });

    it('should show remaining text by default', () => {
        root.findByProps({children: 'remaining'});
    });

    it('should render a touchable to toggle visibility', () => {
        const renderedTouchable = root.findAllByType(Touchable)[1];

        act(() => {
            renderedTouchable.props.onPress();
        });

        expect(easeInTransition).toHaveBeenCalledTimes(1);

        root.findByProps({children: 'budgeted'});
        root.findByProps({children: 'spent'});
    });
});
