import TestRenderer from 'react-test-renderer';
import React from 'react';

import {createRandomExpense, createRandomVariableCategories, createRandomVariableCategory} from '../../models';
import {chance} from '../../chance';
import ExpenseItem from '../../../src/components/budget/ExpenseItem';
import {SmallText} from '../../../src/components/generic/Text';

describe('ExpenseItem', () => {
    let root,
        expectedVariableCategory,
        expectedProps;

    const render = (): void => {
        root = TestRenderer.create(
            <ExpenseItem {...expectedProps} />
        ).root;
    };

    beforeEach(() => {
        expectedVariableCategory = createRandomVariableCategory();
        expectedProps = {
            expense: createRandomExpense({variableCategoryId: expectedVariableCategory.variableCategoryId}),
            variableCategories: chance.shuffle([...createRandomVariableCategories(), expectedVariableCategory])
        };

        render();
    });

    it('should render the category name', () => {
        root.findByProps({children: expectedVariableCategory.name});
    });

    it('should **not** render the expense name if there is not one', () => {
        expectedProps.expense.name = null;
        render();

        expect(root.findAllByType(SmallText)).toEqual([]);
    });
});
