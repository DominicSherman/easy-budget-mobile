import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';

import {createRandomExpense, createRandomExpenses, createRandomVariableCategory} from '../../models';
import VariableCategoryItem from '../../../src/components/variable-category/VariableCategoryItem';
import {chance} from '../../chance';
import CardView from '../../../src/components/generic/CardView';
import {Route} from '../../../src/enums/Route';
import EditIcon from '../../../src/components/generic/EditIcon';
import EditVariableCategoryForm from '../../../src/components/variable-category/EditVariableCategoryForm';
import * as hooks from '../../../src/utils/hooks';

jest.mock('../../../src/utils/hooks');
jest.mock('../../../src/services/animation-service');
jest.mock('../../../src/services/auth-service');

describe('VariableCategoryItem', () => {
    let root,
        expectedNavigation,
        expectedProps;

    const {useBudgetNavigation} = hooks as jest.Mocked<typeof hooks>;

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
        expectedNavigation = {
            navigate: jest.fn()
        };

        useBudgetNavigation.mockReturnValue(expectedNavigation);

        render();
    });

    it('should render a CardView', () => {
        const renderedCardView = root.findByType(CardView);

        renderedCardView.props.onPress();

        expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(expectedNavigation.navigate).toHaveBeenCalledWith({
            name: Route.VARIABLE_CATEGORY,
            params: {
                variableCategoryId: expectedProps.variableCategory.variableCategoryId
            }
        });
    });

    it('should show remaining text by default', () => {
        root.findByProps({children: 'remaining'});
    });

    it('should render an edit icon to toggle the edit form', () => {
        const renderedTouchable = root.findByType(EditIcon);

        act(() => {
            renderedTouchable.props.onPress();
        });

        root.findByType(EditVariableCategoryForm);
    });
});
