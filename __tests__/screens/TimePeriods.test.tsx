import React from 'react';
import {act, fireEvent, render, RenderResult} from '@testing-library/react-native';
import * as apolloHooks from '@apollo/react-hooks';
import moment from 'moment';
import {Alert} from 'react-native';
import {MutationResult} from '@apollo/react-common';

import TimePeriods from '../../src/screens/TimePeriods';
import {createRandomQueryResult, createRandomTimePeriod} from '../models';
import {getTimePeriodsQuery} from '../../src/graphql/queries';
import * as hooks from '../../src/utils/hooks';
import {chance} from '../chance';
import {Mode} from '../../src/enums/Mode';
import {getFormattedTimePeriodText} from '../../src/utils/utils';
import {Route} from '../../src/enums/Route';
import {deleteTimePeriodMutation, updateTimePeriodMutation} from '../../src/graphql/mutations';
import {ITimePeriod} from '../../autogen/ITimePeriod';
import * as errorAndLoadingService from '../../src/services/error-and-loading-service';
import {RegularText} from '../../src/components/generic/Text';
import {setTimePeriod} from '../../src/redux/action-creators';
import {InformationRef} from '../../src/screens/Information';

jest.mock('@apollo/react-hooks');
jest.mock('../../src/redux/action-creators');
jest.mock('../../src/services/animation-service');
jest.mock('../../src/utils/hooks');
jest.mock('../../src/services/auth-service');
jest.mock('../../src/services/error-and-loading-service');

describe('TimePeriods', () => {
    const {useQuery, useMutation} = apolloHooks as jest.Mocked<typeof apolloHooks>;
    const {useMode, useBudgetNavigation, useTimePeriodId} = hooks as jest.Mocked<typeof hooks>;
    const {getEarlyReturn} = errorAndLoadingService as jest.Mocked<typeof errorAndLoadingService>;

    let testInstance: RenderResult,
        createTimePeriod,
        updateTimePeriod,
        deleteTimePeriod,
        expectedInactiveTimePeriods,
        expectedActiveTimePeriod,
        expectedNavigation,
        expectedData;

    const renderComponent = (): void => {
        testInstance = render(<TimePeriods />);
    };
    const rerender = (): void => {
        testInstance.rerender(<TimePeriods />);
    };

    beforeEach(() => {
        expectedInactiveTimePeriods = [
            createRandomTimePeriod({
                beginDate: moment().subtract(30, 'd').toISOString(),
                endDate: moment().subtract(2, 'd').toISOString()
            }),
            createRandomTimePeriod({
                beginDate: moment().add(2, 'd').toISOString(),
                endDate: moment().add(30, 'd').toISOString()
            })
        ];
        expectedActiveTimePeriod = createRandomTimePeriod({
            beginDate: moment().subtract(1, 'd').toISOString(),
            endDate: moment().add(1, 'd').toISOString()
        });

        const expectedTimePeriods = [
            expectedActiveTimePeriod,
            ...expectedInactiveTimePeriods
        ];

        expectedData = {
            timePeriods: chance.shuffle(expectedTimePeriods)
        };
        createTimePeriod = jest.fn();
        updateTimePeriod = jest.fn();
        deleteTimePeriod = jest.fn();
        expectedNavigation = {
            navigate: jest.fn()
        };

        useMode.mockReturnValue(chance.pickone(Object.values(Mode)));
        useBudgetNavigation.mockReturnValue(expectedNavigation);

        useMutation.mockImplementation((mutation) => {
            if (mutation === updateTimePeriodMutation) {
                return [updateTimePeriod, {} as MutationResult];
            } else if (mutation === deleteTimePeriodMutation) {
                return [deleteTimePeriod, {} as MutationResult];
            }

            return [createTimePeriod, {} as MutationResult];
        });
        useQuery.mockImplementation((query, options) => {
            if (query === getTimePeriodsQuery) {
                return createRandomQueryResult(expectedData);
            }

            // @ts-ignore
            const timePeriodId = options!.variables!.timePeriodId;
            const data = {
                timePeriod: expectedData.timePeriods.find((t) => t.timePeriodId === timePeriodId)
            };

            return createRandomQueryResult(data);
        });
        Alert.alert = jest.fn();

        renderComponent();
    });

    it('should show the empty screen when there are no time periods', () => {
        useQuery.mockImplementation((query, options) => {
            if (query === getTimePeriodsQuery) {
                expectedData.timePeriods = [];

                return createRandomQueryResult(expectedData);
            }

            // @ts-ignore
            const timePeriodId = options!.variables!.timePeriodId;
            const data = {
                timePeriod: expectedData.timePeriods.find((t) => t.timePeriodId === timePeriodId)
            };

            return createRandomQueryResult(data);
        });
        renderComponent();

        const renderedSubText = testInstance.getByText('What is a time period?');

        act(() => {
            fireEvent.press(renderedSubText);
        });

        expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(expectedNavigation.navigate).toHaveBeenCalledWith({
            name: Route.INFORMATION,
            params: {
                ref: InformationRef.TIME_PERIOD
            }
        });
    });

    it('should open the create time period form when the plus icon is pressed', () => {
        const renderedIcon = testInstance.getByTestId('PlusMinusIcon');

        act(() => {
            fireEvent.press(renderedIcon);
        });

        const renderedBeginDateButton = testInstance.getByTestId('Date-Begin Date');

        act(() => {
            fireEvent.press(renderedBeginDateButton);
        });

        expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(expectedNavigation.navigate).toHaveBeenCalledWith({
            name: Route.DATE_PICKER,
            params: {
                date: new Date(moment().startOf('day').toISOString()),
                setDate: expect.any(Function),
                title: 'Begin Date'
            }
        });

        const renderedCreateButton = testInstance.getByText('Create');

        act(() => {
            fireEvent.press(renderedCreateButton);
        });

        expect(createTimePeriod).toHaveBeenCalledTimes(1);
    });

    it('should open the edit time period form when the card view is pressed and allow the user to update', () => {
        const expectedItem = chance.pickone<ITimePeriod>(expectedData.timePeriods);
        const renderedItem = testInstance.getByTestId(`TimePeriodItem-${expectedItem.timePeriodId}`);

        act(() => {
            fireEvent.press(renderedItem);
        });

        const renderedBeginDateButton = testInstance.getByTestId('Date-Begin Date');

        act(() => {
            fireEvent.press(renderedBeginDateButton);
        });

        expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(expectedNavigation.navigate).toHaveBeenCalledWith({
            name: Route.DATE_PICKER,
            params: {
                date: new Date(expectedItem.beginDate),
                setDate: expect.any(Function),
                title: 'Begin Date'
            }
        });

        act(() => {
            expectedNavigation.navigate.mock.calls[0][0].params.setDate(new Date(moment().toISOString()));
        });

        const renderedUpdateButton = testInstance.getByText('Update');

        act(() => {
            fireEvent.press(renderedUpdateButton);
        });

        expect(updateTimePeriod).toHaveBeenCalledTimes(1);
    });

    it('should navigate to the home screen when a browse button is pressed', () => {
        const renderedBrowseButton = testInstance.getAllByText('Browse')[0];

        act(() => {
            fireEvent.press(renderedBrowseButton);
        });

        expect(setTimePeriod).toHaveBeenCalledTimes(1);
        expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(expectedNavigation.navigate).toHaveBeenCalledWith({
            name: Route.HOME,
            params: {}
        });
    });

    it('should show the current text for the currently selected time period', () => {
        const selectedTimePeriod = chance.pickone<ITimePeriod>(expectedData.timePeriods);

        useTimePeriodId.mockReturnValue(selectedTimePeriod.timePeriodId);
        rerender();

        testInstance.getByText('Current');
    });

    it('should open the edit time period form when the card view is pressed and allow the user to delete', () => {
        const expectedItem = chance.pickone<ITimePeriod>(expectedInactiveTimePeriods);
        const renderedItem = testInstance.getByTestId(`TimePeriodItem-${expectedItem.timePeriodId}`);

        act(() => {
            fireEvent.press(renderedItem);
        });

        const renderedDeleteButton = testInstance.getByText('Delete');

        act(() => {
            fireEvent.press(renderedDeleteButton);
        });

        expect(Alert.alert).toHaveBeenCalledTimes(1);

        // @ts-ignore
        Alert.alert.mock.calls[0][2][1].onPress();

        expect(deleteTimePeriod).toHaveBeenCalledTimes(1);
    });

    describe('early returns', () => {
        it('should get the early return from the service if there is no data from getTimePeriods', () => {
            const expectedErrorAndLoadingText = chance.string();

            getEarlyReturn.mockReturnValue(
                <RegularText>
                    {expectedErrorAndLoadingText}
                </RegularText>
            );
            useQuery.mockReturnValue(createRandomQueryResult(undefined));
            rerender();

            testInstance.getByText(expectedErrorAndLoadingText);
        });

        it('should not show any time periods if the getTimePeriodsQuery fails', () => {
            useQuery.mockImplementation((query) => {
                if (query === getTimePeriodsQuery) {
                    return createRandomQueryResult(expectedData);
                }

                return createRandomQueryResult(undefined);
            });
            rerender();

            const expectedText = getFormattedTimePeriodText(chance.pickone(expectedData.timePeriods));

            expect(testInstance.queryByText(expectedText)).toBeNull();
        });
    });
});
