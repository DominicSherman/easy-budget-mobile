import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {MutationResult} from '@apollo/react-common';
import moment from 'moment';

import Home from '../../src/screens/Home';
import {getUserId} from '../../src/services/auth-service';
import {
    createRandomExpenses,
    createRandomFixedCategories,
    createRandomIncomeItem,
    createRandomIncomeItems,
    createRandomQueryResult,
    createRandomTimePeriod,
    createRandomTimePeriods,
    createRandomUserInformation,
    createRandomVariableCategories
} from '../models';
import {getTimePeriodQuery, homeScreenQuery} from '../../src/graphql/queries';
import {getEarlyReturn} from '../../src/services/error-and-loading-service';
import {chance} from '../chance';
import CardView from '../../src/components/generic/CardView';
import {Route} from '../../src/enums/Route';
import Button from '../../src/components/generic/Button';
import {SmallText} from '../../src/components/generic/Text';
import * as hooks from '../../src/utils/hooks';
import {Mode} from '../../src/enums/Mode';
import {TimePeriodType} from '../../src/redux/reducer';
import TimePeriods from '../../src/screens/TimePeriods';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('@react-navigation/native');
jest.mock('../../src/utils/hooks');
jest.mock('../../src/services/auth-service');

describe('Home', () => {
    const {useQuery, useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useBudgetNavigation, useMode, useTimePeriod, useUserInformation} = hooks as jest.Mocked<typeof hooks>;

    let root,
        expectedNavigation,
        expectedTimePeriod,
        expectedUserInformation,
        expectedData;

    const render = (): void => {
        root = TestRenderer.create(<Home />).root;
    };

    beforeEach(() => {
        expectedTimePeriod = createRandomTimePeriod({type: TimePeriodType.ACTIVE});
        expectedUserInformation = createRandomUserInformation();
        expectedData = createRandomQueryResult({
            expenses: createRandomExpenses(),
            fixedCategories: createRandomFixedCategories(),
            incomeItems: chance.n(createRandomIncomeItem, chance.d6(), {recurring: true}),
            timePeriods: createRandomTimePeriods(),
            variableCategories: createRandomVariableCategories()
        }, false);
        expectedNavigation = {
            navigate: jest.fn()
        };

        useQuery.mockImplementation((query) => {
            if (query === getTimePeriodQuery) {
                return {
                    data: {
                        timePeriod: createRandomTimePeriod()
                    }
                };
            } else if (query === homeScreenQuery) {
                return expectedData;
            }

            return createRandomQueryResult();
        });
        useMutation.mockReturnValue([jest.fn(), {} as MutationResult]);
        useBudgetNavigation.mockReturnValue(expectedNavigation);
        useMode.mockReturnValue(chance.pickone(Object.values(Mode)));
        useUserInformation.mockReturnValue(expectedUserInformation);
        useTimePeriod.mockReturnValue(expectedTimePeriod);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('when there is no time period', () => {
        it('should not query', () => {
            useTimePeriod.mockReturnValue(null);
            render();

            expect(useQuery).toHaveBeenCalledWith(homeScreenQuery, {
                skip: true,
                variables: {
                    timePeriodId: '',
                    userId: getUserId()
                }
            });
        });

        it('should return the TimePeriods component', () => {
            useTimePeriod.mockReturnValue(null);
            render();

            root.findByType(TimePeriods);
        });
    });

    describe('when there is a time period', () => {
        it('should query for the active time period data', () => {
            expect(useQuery).toHaveBeenCalledWith(homeScreenQuery, {
                skip: false,
                variables: {
                    timePeriodId: expectedTimePeriod.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should return early if there is no data', () => {
            expectedData.data = undefined;

            useQuery.mockReturnValue(expectedData);

            render();

            const earlyReturn = getEarlyReturn(expectedData);

            root.findByType(earlyReturn.type);
        });

        it('should render four CardViews', () => {
            const [
                renderedThisMonth,
                renderedVariableCategories,
                renderedFixedCategories,
                renderedIncome
            ] = root.findAllByType(CardView);

            renderedThisMonth.props.onPress();
            renderedVariableCategories.props.onPress();
            renderedFixedCategories.props.onPress();
            renderedIncome.props.onPress();

            expect(expectedNavigation.navigate).toHaveBeenCalledTimes(4);
            expect(expectedNavigation.navigate).toHaveBeenCalledWith({
                name: Route.TIME_PERIODS,
                params: {}
            });
            expect(expectedNavigation.navigate).toHaveBeenCalledWith({
                name: Route.VARIABLE_CATEGORIES,
                params: {}
            });
            expect(expectedNavigation.navigate).toHaveBeenCalledWith({
                name: Route.FIXED_CATEGORIES,
                params: {}
            });
            expect(expectedNavigation.navigate).toHaveBeenCalledWith({
                name: Route.INCOME,
                params: {}
            });
        });

        it('should render a button', () => {
            const renderedButton = root.findByType(Button);

            renderedButton.props.onPress();

            expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
            expect(expectedNavigation.navigate).toHaveBeenCalledWith({
                name: Route.EXPENSES,
                params: {}
            });
        });

        it('should use the correct text if there is only one day remaining', () => {
            expectedTimePeriod.endDate = moment().add(5, 'm').toISOString();
            useTimePeriod.mockReturnValue(expectedTimePeriod);
            render();

            const renderedText = root.findAllByType(SmallText)[0];

            expect(renderedText.props.children).toBe(`${moment().diff(moment(expectedTimePeriod.beginDate), 'd')} days done, final day today`);
        });

        it('should render additional text when there are non-recurring income items', () => {
            expectedData.data.incomeItems = [
                ...createRandomIncomeItems(),
                createRandomIncomeItem({recurring: false})
            ];
            useQuery.mockReturnValue(expectedData);
            render();

            root.findByProps({children: 'additional'});
        });
    });
});
