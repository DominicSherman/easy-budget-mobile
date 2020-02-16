import * as reactRedux from 'react-redux';

import {chance} from '../chance';
import {createRandomAppState} from '../models';
import {useBackgroundColor, useMode, usePrimaryColor, useTextColor, useTimePeriodId} from '../../src/redux/hooks';
import {Mode} from '../../src/enums/Mode';
import {colors} from '../../src/constants/colors';

jest.mock('react-redux');

describe('hooks', () => {
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;

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

            expect(actualValue).toBe(colors.white);
        });

        it('should return dark if mode is light', () => {
            useSelector.mockReturnValue(Mode.LIGHT);

            const actualValue = usePrimaryColor();

            expect(actualValue).toBe(colors.dark);
        });
    });

    describe('useBackgroundColor', () => {
        it('should return darkGrey if mode is dark', () => {
            useSelector.mockReturnValue(Mode.DARK);

            const actualValue = useBackgroundColor();

            expect(actualValue).toBe(colors.darkGrey);
        });

        it('should return white if mode is light', () => {
            useSelector.mockReturnValue(Mode.LIGHT);

            const actualValue = useBackgroundColor();

            expect(actualValue).toBe(colors.white);
        });
    });

    describe('useTextColor', () => {
        it('should return primary color in an object', () => {
            useSelector.mockReturnValue(Mode.DARK);

            expect(useTextColor()).toEqual({color: colors.white});
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
});
