import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';

import {createRandomExpense, createRandomExpenses, createRandomVariableCategory} from '../../models';
import VariableCategoryItem from '../../../src/components/variable-category/VariableCategoryItem';
import {chance} from '../../chance';
import CardView from '../../../src/components/generic/CardView';
import {Route} from '../../../src/enums/Route';
import EditVariableCategoryForm from '../../../src/components/variable-category/EditVariableCategoryForm';
import * as hooks from '../../../src/utils/hooks';
import {Color} from '../../../src/constants/color';
import MoreIcon from '../../../src/components/generic/MoreIcon';

jest.mock('../../../src/utils/hooks');
jest.mock('../../../src/services/animation-service');
jest.mock('../../../src/services/auth-service');

describe('VariableCategoryItem', () => {
    let root,
        expectedNavigation,
        expectedProps;

    const {useBudgetNavigation, useTheme} = hooks as jest.Mocked<typeof hooks>;

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
        useTheme.mockReturnValue({
            backgroundColor: chance.pickone(Object.values(Color)),
            textColor: chance.pickone(Object.values(Color))
        });

        render();
    });

    it('should render a MoreIcon', () => {
        const renderedCardView = root.findByType(MoreIcon);

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

    it('should render a card view to toggle the edit form', () => {
        const renderedTouchable = root.findByType(CardView);

        act(() => {
            renderedTouchable.props.onPress();
        });

        root.findByType(EditVariableCategoryForm);
    });
});
