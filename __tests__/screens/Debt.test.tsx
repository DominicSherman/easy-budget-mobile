import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactRedux from 'react-redux';
import {FlatList} from 'react-native';
import {MutationResult} from '@apollo/react-common';

import Debt from '../../src/screens/Debt';
import {createRandomQueryResult, createRandomDebtCategories} from '../models';
import {chance} from '../chance';
import {getEarlyReturn} from '../../src/services/error-and-loading-service';
import {sortByName} from '../../src/utils/sorting-utils';
import * as hooks from '../../src/utils/hooks';
import DebtCategoryItem from '../../src/components/debt-category/DebtCategoryItem';
import {IDebtCategory} from '../../autogen/IDebtCategory';
import EmptyScreen from '../../src/components/generic/EmptyScreen';
import {Route} from '../../src/enums/Route';
import {InformationRef} from '../../src/screens/Information';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('@react-navigation/native');
jest.mock('../../src/services/auth-service');
jest.mock('../../src/utils/hooks');

describe('Debt', () => {
    const {useQuery, useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;
    const {useBudgetNavigation} = hooks as jest.Mocked<typeof hooks>;

    let expectedTimePeriodId,
        expectedData,
        expectedNavigation,
        root;

    const render = (): void => {
        root = TestRenderer.create(
            <Debt />
        ).root;
    };

    beforeEach(() => {
        expectedData = createRandomQueryResult({
            debtCategories: createRandomDebtCategories()
        });
        expectedTimePeriodId = chance.guid();
        expectedNavigation = {
            navigate: jest.fn()
        };

        useQuery.mockReturnValue(expectedData);
        useSelector.mockReturnValue(expectedTimePeriodId);
        useMutation.mockReturnValue([jest.fn(), {loading: chance.bool()} as MutationResult]);
        useBudgetNavigation.mockReturnValue(expectedNavigation);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
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

        expect(renderedFlatList.props.data).toBe(expectedData.data.debtCategories.sort(sortByName));

        const expectedItem = chance.pickone<IDebtCategory>(expectedData.data.debtCategories);

        const renderedItem = renderedFlatList.props.renderItem({item: expectedItem});
        const key = renderedFlatList.props.keyExtractor(expectedItem);

        expect(renderedItem.type).toBe(DebtCategoryItem);
        expect(key).toBe(expectedItem.debtCategoryId);

        const renderedListEmptyComponent = renderedFlatList.props.ListEmptyComponent;

        expect(renderedListEmptyComponent.type).toBe(EmptyScreen);
        expect(renderedListEmptyComponent.props.subText).toBe('What is a debt category?');
        expect(renderedListEmptyComponent.props.titleText).toBe('You haven\'t created any debt categories yet!');

        renderedListEmptyComponent.props.onPressSubText();

        expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(expectedNavigation.navigate).toHaveBeenCalledWith({
            name: Route.INFORMATION,
            params: {
                ref: InformationRef.DEBT
            }
        });
    });
});
