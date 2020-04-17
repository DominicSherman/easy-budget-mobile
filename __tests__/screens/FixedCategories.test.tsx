import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactRedux from 'react-redux';
import {FlatList} from 'react-native';
import {MutationResult} from '@apollo/react-common';

import FixedCategories from '../../src/screens/FixedCategories';
import {createRandomAppState, createRandomFixedCategories, createRandomQueryResult} from '../models';
import {chance} from '../chance';
import {getEarlyReturn} from '../../src/services/error-and-loading-service';
import {sortByName} from '../../src/utils/sorting-utils';
import {IFixedCategory} from '../../autogen/IFixedCategory';
import NoActiveTimePeriod from '../../src/components/time-period/NoActiveTimePeriod';
import FixedCategoryItem from '../../src/components/fixed-category/FixedCategoryItem';
import EmptyScreen from '../../src/components/generic/EmptyScreen';
import {Route} from '../../src/enums/Route';
import {InformationRef} from '../../src/screens/Information';
import * as hooks from '../../src/utils/hooks';
import {Color} from '../../src/constants/color';
import {Mode} from '../../src/enums/Mode';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('@react-navigation/native');
jest.mock('../../src/services/auth-service');
jest.mock('../../src/utils/hooks');

describe('FixedCategories', () => {
    const {useQuery, useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;
    const {useBudgetNavigation, useTheme, useMode} = hooks as jest.Mocked<typeof hooks>;

    let expectedTimePeriodId,
        expectedData,
        expectedNavigation,
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
        expectedNavigation = {
            navigate: jest.fn()
        };

        useQuery.mockReturnValue(expectedData);
        useSelector.mockReturnValue(expectedTimePeriodId);
        useMutation.mockReturnValue([jest.fn(), {loading: chance.bool()} as MutationResult]);
        useBudgetNavigation.mockReturnValue(expectedNavigation);
        useTheme.mockReturnValue({
            backgroundColor: chance.pickone(Object.values(Color)),
            textColor: chance.pickone(Object.values(Color))
        });
        useMode.mockReturnValue(chance.pickone(Object.values(Mode)));

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

        const renderedListEmptyComponent = renderedFlatList.props.ListEmptyComponent;

        expect(renderedListEmptyComponent.type).toBe(EmptyScreen);
        expect(renderedListEmptyComponent.props.subText).toBe('What is a fixed category?');
        expect(renderedListEmptyComponent.props.titleText).toBe('You haven\'t created any fixed categories yet!');

        renderedListEmptyComponent.props.onPressSubText();

        expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(expectedNavigation.navigate).toHaveBeenCalledWith({
            name: Route.INFORMATION,
            params: {
                ref: InformationRef.FIXED
            }
        });
    });
});
