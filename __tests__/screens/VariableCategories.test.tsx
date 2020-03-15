import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {FlatList} from 'react-native';
import * as navigation from '@react-navigation/native';
import {MutationResult} from '@apollo/react-common';

import VariableCategories from '../../src/screens/VariableCategories';
import {
    createRandomExpense,
    createRandomQueryResult,
    createRandomVariableCategories,
    createRandomVariableCategory
} from '../models';
import {chance} from '../chance';
import {getEarlyReturn} from '../../src/services/error-and-loading-service';
import {sortByName} from '../../src/utils/sorting-utils';
import {IVariableCategory} from '../../autogen/IVariableCategory';
import NoActiveTimePeriod from '../../src/components/time-period/NoActiveTimePeriod';
import VariableCategoryItem from '../../src/components/variable-category/VariableCategoryItem';
import * as hooks from '../../src/redux/hooks';
import EmptyScreen from '../../src/components/generic/EmptyScreen';
import {Route} from '../../src/enums/Route';
import {InformationRef} from '../../src/screens/Information';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('@react-navigation/native');
jest.mock('../../src/services/auth-service');
jest.mock('../../src/redux/hooks');

describe('VariableCategories', () => {
    const {useQuery, useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useTimePeriodId} = hooks as jest.Mocked<typeof hooks>;
    const {useNavigation} = navigation as jest.Mocked<typeof navigation>;

    let expectedTimePeriodId,
        expectedData,
        expectedNavigation,
        root;

    const render = (): void => {
        root = TestRenderer.create(
            <VariableCategories />
        ).root;
    };

    beforeEach(() => {
        const variableCategoryId = chance.guid();

        expectedData = createRandomQueryResult({
            expenses: chance.n(createRandomExpense, chance.d6(), {variableCategoryId}),
            variableCategories: [
                ...createRandomVariableCategories(),
                createRandomVariableCategory({variableCategoryId})
            ]
        });
        expectedTimePeriodId = chance.guid();
        expectedNavigation = {
            navigate: jest.fn()
        };

        useTimePeriodId.mockReturnValue(expectedTimePeriodId);
        useQuery.mockReturnValue(expectedData);
        useMutation.mockReturnValue([jest.fn(), {loading: chance.bool()} as MutationResult]);
        useNavigation.mockReturnValue(expectedNavigation);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call useTimePeriodId', () => {
        expect(useTimePeriodId).toHaveBeenCalledTimes(1);
    });

    it('should return early if there is no time period', () => {
        useTimePeriodId.mockReturnValue('');
        render();

        root.findByType(NoActiveTimePeriod);
    });

    it('should return early when there is no data', () => {
        expectedData.data = undefined;
        useQuery.mockReturnValue(expectedData);

        render();

        const earlyReturn = getEarlyReturn(expectedData);

        root.findByType(earlyReturn.type);
    });

    it('should render a FlatList', () => {
        const renderedFlatList = root.findByType(FlatList);

        expect(renderedFlatList.props.data).toBe(expectedData.data.variableCategories.sort(sortByName));

        const expectedItem = chance.pickone<IVariableCategory>(expectedData.data.variableCategories);

        const renderedItem = renderedFlatList.props.renderItem({item: expectedItem});
        const key = renderedFlatList.props.keyExtractor(expectedItem);

        expect(renderedItem.type).toBe(VariableCategoryItem);
        expect(key).toBe(expectedItem.variableCategoryId);

        const renderedListEmptyComponent = renderedFlatList.props.ListEmptyComponent;

        expect(renderedListEmptyComponent.type).toBe(EmptyScreen);
        expect(renderedListEmptyComponent.props.subText).toBe('What is a variable category?');
        expect(renderedListEmptyComponent.props.titleText).toBe('You haven\'t created any variable categories yet!');

        renderedListEmptyComponent.props.onPressSubText();

        expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(expectedNavigation.navigate).toHaveBeenCalledWith({
            name: Route.INFORMATION,
            params: {
                ref: InformationRef.VARIABLE
            }
        });
    });
});
