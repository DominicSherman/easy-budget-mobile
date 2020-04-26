import * as reactRedux from 'react-redux';
import * as navigation from '@react-navigation/native';

import {chance} from '../chance';
import {createRandomAppState} from '../models';
import {
    useBudgetNavigation,
    useDarkBlueColor,
    useMode,
    usePrimaryBackgroundColor,
    usePrimaryColor,
    useSecondaryBackgroundColor,
    useShockBlueColor,
    useTheme,
    useThemedBackgroundColor,
    useThemedSelectedColor,
    useThemedTextColor, useTimePeriod,
    useTimePeriodId,
    useUserInformation
} from '../../src/utils/hooks';
import {Color} from '../../src/constants/color';
import * as themeService from '../../src/services/theme-service';

jest.mock('react-redux');
jest.mock('@react-navigation/native');
jest.mock('../../src/services/theme-service');

describe('hooks', () => {
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;
    const {useNavigation} = navigation as jest.Mocked<typeof navigation>;
    const {
        getDarkBlueColor,
        getPrimaryBackgroundColor,
        getPrimaryColor,
        getSecondaryBackgroundColor,
        getShockBlueColor,
        getThemedBackgroundColor,
        getThemedSelectedColor,
        getThemedTextColor,
        Theme
    } = themeService as jest.Mocked<typeof themeService>;

    let expectedState,
        expectedSelector;

    beforeEach(() => {
        expectedSelector = chance.string();
        expectedState = createRandomAppState();

        useSelector.mockReturnValue(expectedSelector);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('useMode', () => {
        it('should return the mode from state', () => {
            const actualValue = useMode();
            const selector = useSelector.mock.calls[0][0];
            const returnValue = selector(expectedState);

            expect(actualValue).toBe(expectedSelector);
            expect(returnValue).toEqual(expectedState.mode);
        });
    });

    describe('usePrimaryColor', () => {
        it('should return from getPrimaryBackgroundColor', () => {
            const expectedColor = chance.pickone(Object.values(Color));

            getPrimaryColor.mockReturnValue(expectedColor);

            const actualValue = usePrimaryColor();

            expect(actualValue).toBe(expectedColor);
            expect(getPrimaryColor).toHaveBeenCalledTimes(1);
            expect(getPrimaryColor).toHaveBeenCalledWith(expectedSelector);
        });
    });

    describe('usePrimaryBackgroundColor', () => {
        it('should return from getPrimaryBackgroundColor', () => {
            const expectedColor = chance.pickone(Object.values(Color));

            getPrimaryBackgroundColor.mockReturnValue(expectedColor);

            const actualValue = usePrimaryBackgroundColor();

            expect(actualValue).toBe(expectedColor);
            expect(getPrimaryBackgroundColor).toHaveBeenCalledTimes(1);
            expect(getPrimaryBackgroundColor).toHaveBeenCalledWith(expectedSelector);
        });
    });

    describe('useSecondaryBackgroundColor', () => {
        it('should return from getSecondaryBackgroundColor', () => {
            const expectedColor = chance.pickone(Object.values(Color));

            getSecondaryBackgroundColor.mockReturnValue(expectedColor);

            const actualValue = useSecondaryBackgroundColor();

            expect(actualValue).toBe(expectedColor);
            expect(getSecondaryBackgroundColor).toHaveBeenCalledTimes(1);
            expect(getSecondaryBackgroundColor).toHaveBeenCalledWith(expectedSelector);
        });
    });

    describe('useThemedBackgroundColor', () => {
        it('should return from getThemedBackgroundColor', () => {
            const expectedColor = chance.pickone(Object.values(Color));
            const expectedTheme = chance.pickone(Object.values(Theme));

            getThemedBackgroundColor.mockReturnValue(expectedColor);

            const actualValue = useThemedBackgroundColor(expectedTheme);

            expect(actualValue).toBe(expectedColor);
            expect(getThemedBackgroundColor).toHaveBeenCalledTimes(1);
            expect(getThemedBackgroundColor).toHaveBeenCalledWith(expectedSelector, expectedTheme);
        });
    });

    describe('useThemedTextColor', () => {
        it('should return from getThemedTextColor', () => {
            const expectedColor = chance.pickone(Object.values(Color));
            const expectedTheme = chance.pickone(Object.values(Theme));

            getThemedTextColor.mockReturnValue(expectedColor);

            const actualValue = useThemedTextColor(expectedTheme);

            expect(actualValue).toBe(expectedColor);
            expect(getThemedTextColor).toHaveBeenCalledTimes(1);
            expect(getThemedTextColor).toHaveBeenCalledWith(expectedSelector, expectedTheme);
        });
    });

    describe('useThemedSelectedColor', () => {
        it('should return from getThemedSelectedColor', () => {
            const expectedColor = chance.pickone(Object.values(Color));
            const expectedTheme = chance.pickone(Object.values(Theme));

            getThemedSelectedColor.mockReturnValue(expectedColor);

            const actualValue = useThemedSelectedColor(expectedTheme);

            expect(actualValue).toBe(expectedColor);
            expect(getThemedSelectedColor).toHaveBeenCalledTimes(1);
            expect(getThemedSelectedColor).toHaveBeenCalledWith(expectedSelector, expectedTheme);
        });
    });

    describe('useTheme', () => {
        it('should return from getThemedBackgroundColor', () => {
            const expectedBackgroundColor = chance.pickone(Object.values(Color));
            const expectedTextColor = chance.pickone(Object.values(Color));
            const expectedTheme = chance.pickone(Object.values(Theme));

            getThemedBackgroundColor.mockReturnValue(expectedBackgroundColor);
            getThemedTextColor.mockReturnValue(expectedTextColor);

            const actualValue = useTheme(expectedTheme);

            expect(actualValue).toEqual({
                backgroundColor: expectedBackgroundColor,
                textColor: expectedTextColor
            });
            expect(getThemedBackgroundColor).toHaveBeenCalledTimes(1);
            expect(getThemedBackgroundColor).toHaveBeenCalledWith(expectedSelector, expectedTheme);
            expect(getThemedTextColor).toHaveBeenCalledTimes(1);
            expect(getThemedTextColor).toHaveBeenCalledWith(expectedSelector, expectedTheme);
        });
    });

    describe('useDarkBlueColor', () => {
        it('should return from getPrimaryBackgroundColor', () => {
            const expectedColor = chance.pickone(Object.values(Color));

            getDarkBlueColor.mockReturnValue(expectedColor);

            const actualValue = useDarkBlueColor();

            expect(actualValue).toBe(expectedColor);
            expect(getDarkBlueColor).toHaveBeenCalledTimes(1);
            expect(getDarkBlueColor).toHaveBeenCalledWith(expectedSelector);
        });
    });

    describe('useShockBlueColor', () => {
        it('should return from getPrimaryBackgroundColor', () => {
            const expectedColor = chance.pickone(Object.values(Color));

            getShockBlueColor.mockReturnValue(expectedColor);

            const actualValue = useShockBlueColor();

            expect(actualValue).toBe(expectedColor);
            expect(getShockBlueColor).toHaveBeenCalledTimes(1);
            expect(getShockBlueColor).toHaveBeenCalledWith(expectedSelector);
        });
    });

    describe('useTimePeriodId', () => {
        it('should return the timePeriodId from state', () => {
            const actualValue = useTimePeriodId();
            const selector = useSelector.mock.calls[0][0];
            const returnValue = selector(expectedState);

            expect(actualValue).toBe(expectedSelector);
            expect(returnValue).toEqual(expectedState.timePeriod.timePeriodId);
        });

        it('should return an empty string if time period is null', () => {
            expectedState.timePeriod = null;

            const actualValue = useTimePeriodId();
            const selector = useSelector.mock.calls[0][0];
            const returnValue = selector(expectedState);

            expect(actualValue).toBe(expectedSelector);
            expect(returnValue).toEqual('');
        });
    });

    describe('useTimePeriod', () => {
        it('should return the timePeriod from state', () => {
            const actualValue = useTimePeriod();
            const selector = useSelector.mock.calls[0][0];
            const returnValue = selector(expectedState);

            expect(actualValue).toBe(expectedSelector);
            expect(returnValue).toEqual(expectedState.timePeriod);
        });
    });

    describe('useUserInformation', () => {
        it('should return the timePeriodId from state', () => {
            const actualValue = useUserInformation();
            const selector = useSelector.mock.calls[0][0];
            const returnValue = selector(expectedState);

            expect(actualValue).toBe(expectedSelector);
            expect(returnValue).toEqual(expectedState.userInformation);
        });
    });

    describe('useBudgetNavigation', () => {
        it('should call useNavigation', () => {
            const expectedNavigation = {
                [chance.string()]: chance.string()
            };

            // @ts-ignore
            useNavigation.mockReturnValue(expectedNavigation);

            expect(useBudgetNavigation()).toEqual(expectedNavigation);
        });
    });
});
