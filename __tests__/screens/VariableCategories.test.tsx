import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {FlatList} from 'react-native';

import VariableCategories from '../../src/screens/VariableCategories';
import {
    createRandomExpense,
    createRandomQueryResult,
    createRandomVariableCategories,
    createRandomVariableCategory
} from '../models';
import {chance} from '../chance';
import {getEarlyReturn} from '../../src/services/error-and-loading-service';
import CreateVariableCategoryForm from '../../src/components/variable-category/CreateVariableCategoryForm';
import {sortByName} from '../../src/utils/sorting-utils';
import {IVariableCategory} from '../../autogen/IVariableCategory';
import NoActiveTimePeriod from '../../src/components/time-period/NoActiveTimePeriod';
import VariableCategoryItem from '../../src/components/variable-category/VariableCategoryItem';
import * as hooks from '../../src/redux/hooks';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('@react-navigation/native');
jest.mock('../../src/services/auth-service');
jest.mock('../../src/redux/hooks');

describe('VariableCategories', () => {
    const {useQuery, useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useTimePeriodId} = hooks as jest.Mocked<typeof hooks>;

    let expectedTimePeriodId,
        expectedData,
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

        useTimePeriodId.mockReturnValue(expectedTimePeriodId);
        useQuery.mockReturnValue(expectedData);
        // @ts-ignore
        useMutation.mockReturnValue([jest.fn(), {loading: chance.bool()}]);

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

        expect(renderedFlatList.props.ListHeaderComponent.type).toBe(CreateVariableCategoryForm);
        expect(renderedFlatList.props.data).toBe(expectedData.data.variableCategories.sort(sortByName));

        const expectedItem = chance.pickone<IVariableCategory>(expectedData.data.variableCategories);

        const renderedItem = renderedFlatList.props.renderItem({item: expectedItem});
        const key = renderedFlatList.props.keyExtractor(expectedItem);

        expect(renderedItem.type).toBe(VariableCategoryItem);
        expect(key).toBe(expectedItem.variableCategoryId);
    });
});
