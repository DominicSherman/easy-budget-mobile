import * as reactRedux from 'react-redux';
import * as navigation from '@react-navigation/native';

import {chance} from '../chance';
import {createRandomAppState} from '../models';
import {
    useBackgroundColor, useBudgetNavigation,
    useMode,
    usePrimaryColor,
    useTextColor,
    useTimePeriodId,
    useUserInformation
} from '../../src/utils/hooks';
import {Mode} from '../../src/enums/Mode';
import {Color} from '../../src/constants/color';

jest.mock('react-redux');
jest.mock('@react-navigation/native');

describe('hooks', () => {
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;
    const {useNavigation} = navigation as jest.Mocked<typeof navigation>;

    let expectedSelection,
        expectedState;

    beforeEach(() => {
        expectedSelection = chance.string();
        expectedState = createRandomAppState();

        useSelector.mockReturnValue(expectedSelection);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('useMode', () => {
        it('should return the mode from state', () => {
            const actualValue = useMode();
            const selector = useSelector.mock.calls[0][0];
            const returnValue = selector(expectedState);

            expect(actualValue).toBe(expectedSelection);
            expect(returnValue).toEqual(expectedState.mode);
        });
    });

    describe('usePrimaryColor', () => {
        it('should return white if mode is dark', () => {
            useSelector.mockReturnValue(Mode.DARK);

            const actualValue = usePrimaryColor();

            expect(actualValue).toBe(Color.white);
        });

        it('should return dark if mode is light', () => {
            useSelector.mockReturnValue(Mode.LIGHT);

            const actualValue = usePrimaryColor();

            expect(actualValue).toBe(Color.dark);
        });
    });

    describe('useBackgroundColor', () => {
        it('should return darkGrey if mode is dark', () => {
            useSelector.mockReturnValue(Mode.DARK);

            const actualValue = useBackgroundColor();

            expect(actualValue).toBe(Color.darkGrey);
        });

        it('should return white if mode is light', () => {
            useSelector.mockReturnValue(Mode.LIGHT);

            const actualValue = useBackgroundColor();

            expect(actualValue).toBe(Color.white);
        });
    });

    describe('useTextColor', () => {
        it('should return primary color in an object', () => {
            useSelector.mockReturnValue(Mode.DARK);

            expect(useTextColor()).toEqual({color: Color.white});
        });
    });

    describe('useTimePeriodId', () => {
        it('should return the timePeriodId from state', () => {
            const actualValue = useTimePeriodId();
            const selector = useSelector.mock.calls[0][0];
            const returnValue = selector(expectedState);

            expect(actualValue).toBe(expectedSelection);
            expect(returnValue).toEqual(expectedState.timePeriodId);
        });
    });

    describe('useUserInformation', () => {
        it('should return the timePeriodId from state', () => {
            const actualValue = useUserInformation();
            const selector = useSelector.mock.calls[0][0];
            const returnValue = selector(expectedState);

            expect(actualValue).toBe(expectedSelection);
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
