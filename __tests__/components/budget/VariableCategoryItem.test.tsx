import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import * as reactNavigationNative from '@react-navigation/native';

import {createRandomExpense, createRandomExpenses, createRandomVariableCategory} from '../../models';
import VariableCategoryItem from '../../../src/components/budget/VariableCategoryItem';
import {chance} from '../../chance';
import {easeInTransition} from '../../../src/services/animation-service';
import CardView from '../../../src/components/generic/CardView';
import {Route} from '../../../src/enums/routes';

jest.mock('../../../src/services/animation-service');

describe('VariableCategoryItem', () => {
    let root,
        expectedNavigation,
        expectedProps;

    const {useNavigation} = reactNavigationNative as jest.Mocked<typeof reactNavigationNative>;

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

        useNavigation.mockReturnValue(expectedNavigation);

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
