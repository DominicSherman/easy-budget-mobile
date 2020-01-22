import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactRedux from 'react-redux';
import {FlatList, View} from 'react-native';

import VariableCategories from '../../src/screens/VariableCategories';
import {createRandomAppState, createRandomQueryResult, createRandomVariableCategories} from '../models';
import {chance} from '../chance';
import {getEarlyReturn} from '../../src/services/error-and-loading-service';
import CreateVariableCategoryForm from '../../src/components/CreateVariableCategoryForm';
import {sortByName} from '../../src/utils/sorting-utils';
import {IVariableCategory} from '../../autogen/IVariableCategory';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../src/services/auth-service');

describe('VariableCategories', () => {
    const {useQuery, useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;

    let expectedTimePeriodId,
        expectedData,
        root;

    const render = (): void => {
        root = TestRenderer.create(
            <VariableCategories />
        ).root;
    };

    beforeEach(() => {
        expectedData = createRandomQueryResult({
            variableCategories: createRandomVariableCategories()
        });
        expectedTimePeriodId = chance.guid();

        useQuery.mockReturnValue(expectedData);
        useSelector.mockReturnValue(expectedTimePeriodId);
        // @ts-ignore
        useMutation.mockReturnValue([jest.fn()]);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call useSelector', () => {
        const expectedState = createRandomAppState();
        const selector = useSelector.mock.calls[0][0](expectedState);

        expect(selector).toBe(expectedState.timePeriodId);
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

        expect(renderedFlatList.props.ListFooterComponent.type).toBe(CreateVariableCategoryForm);
        expect(renderedFlatList.props.data).toBe(expectedData.data.variableCategories.sort(sortByName));

        const expectedItem = chance.pickone<IVariableCategory>(expectedData.data.variableCategories);

        const renderedItem = renderedFlatList.props.renderItem({item: expectedItem});
        const key = renderedFlatList.props.keyExtractor(expectedItem);

        expect(renderedItem.type).toBe(View);
        expect(key).toBe(expectedItem.variableCategoryId);
    });
});
