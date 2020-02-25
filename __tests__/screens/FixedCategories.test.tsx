import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactRedux from 'react-redux';
import {FlatList} from 'react-native';

import FixedCategories from '../../src/screens/FixedCategories';
import {createRandomAppState, createRandomFixedCategories, createRandomQueryResult} from '../models';
import {chance} from '../chance';
import {getEarlyReturn} from '../../src/services/error-and-loading-service';
import {sortByName} from '../../src/utils/sorting-utils';
import {IFixedCategory} from '../../autogen/IFixedCategory';
import NoActiveTimePeriod from '../../src/components/time-period/NoActiveTimePeriod';
import FixedCategoryItem from '../../src/components/fixed-category/FixedCategoryItem';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('@react-navigation/native');
jest.mock('../../src/services/auth-service');

describe('FixedCategories', () => {
    const {useQuery, useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;

    let expectedTimePeriodId,
        expectedData,
        root;

    const render = (): void => {
        root = TestRenderer.create(
            <FixedCategories />
        ).root;
    };

    beforeEach(() => {
        expectedData = createRandomQueryResult({
            fixedCategories: createRandomFixedCategories()
        });
        expectedTimePeriodId = chance.guid();

        useQuery.mockReturnValue(expectedData);
        useSelector.mockReturnValue(expectedTimePeriodId);
        // @ts-ignore
        useMutation.mockReturnValue([jest.fn(), {loading: chance.bool()}]);

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

    it('should return early if there is no time period', () => {
        useSelector.mockReturnValue(null);
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

        expect(renderedFlatList.props.data).toBe(expectedData.data.fixedCategories.sort(sortByName));

        const expectedItem = chance.pickone<IFixedCategory>(expectedData.data.fixedCategories);

        const renderedItem = renderedFlatList.props.renderItem({item: expectedItem});
        const key = renderedFlatList.props.keyExtractor(expectedItem);

        expect(renderedItem.type).toBe(FixedCategoryItem);
        expect(key).toBe(expectedItem.fixedCategoryId);
    });
});
