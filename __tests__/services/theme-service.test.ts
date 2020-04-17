import {
    getDarkBlueColor,
    getPrimaryBackgroundColor, getPrimaryColor,
    getSecondaryBackgroundColor, getShockBlueColor,
    getThemedBackgroundColor, getThemedSelectedColor, getThemedTextColor,
    Theme
} from '../../src/services/theme-service';
import {Mode} from '../../src/enums/Mode';
import {Color} from '../../src/constants/color';

describe('theme service', () => {
    describe('getPrimaryBackgroundColor', () => {
        it('should return offBlack if mode is dark', () => {
            expect(getPrimaryBackgroundColor(Mode.DARK)).toBe(Color.offBlack);
        });

        it('should return lightGrey if mode is light', () => {
            expect(getPrimaryBackgroundColor(Mode.LIGHT)).toBe(Color.lightGrey);
        });
    });

    describe('getSecondaryBackgroundColor', () => {
        it('should return darkGrey if mode is dark', () => {
            expect(getSecondaryBackgroundColor(Mode.DARK)).toBe(Color.darkGrey);
        });

        it('should return white if mode is light', () => {
            expect(getSecondaryBackgroundColor(Mode.LIGHT)).toBe(Color.white);
        });
    });

    describe('getThemedBackgroundColor', () => {
        it('should return backgroundBlueDark if mode is dark and theme is blue', () => {
            expect(getThemedBackgroundColor(Mode.DARK, Theme.BLUE)).toBe(Color.backgroundBlueDark);
        });

        it('should return backgroundBlue if mode is light and theme is blue', () => {
            expect(getThemedBackgroundColor(Mode.LIGHT, Theme.BLUE)).toBe(Color.backgroundBlue);
        });
    });

    describe('getThemedTextColor', () => {
        it('should return white if mode is dark and theme is blue', () => {
            expect(getThemedTextColor(Mode.DARK, Theme.BLUE)).toBe(Color.white);
        });

        it('should return shockBlue if mode is light and theme is blue', () => {
            expect(getThemedTextColor(Mode.LIGHT, Theme.BLUE)).toBe(Color.shockBlue);
        });
    });

    describe('getThemedSelectedColor', () => {
        it('should return white if mode is dark and theme is blue', () => {
            expect(getThemedSelectedColor(Mode.DARK, Theme.BLUE)).toBe(Color.backgroundBlueDark);
        });

        it('should return shockBlue if mode is light and theme is blue', () => {
            expect(getThemedSelectedColor(Mode.LIGHT, Theme.BLUE)).toBe(Color.shockBlue);
        });
    });

    describe('getPrimaryColor', () => {
        it('should return white if mode is dark', () => {
            expect(getPrimaryColor(Mode.DARK)).toBe(Color.white);
        });

        it('should return dark if mode is light', () => {
            expect(getPrimaryColor(Mode.LIGHT)).toBe(Color.dark);
        });
    });

    describe('getDarkBlueColor', () => {
        it('should return white if mode is dark', () => {
            expect(getDarkBlueColor(Mode.DARK)).toBe(Color.white);
        });

        it('should return darkNavy if mode is light', () => {
            expect(getDarkBlueColor(Mode.LIGHT)).toBe(Color.darkNavy);
        });
    });

    describe('getShockBlueColor', () => {
        it('should return lightDarkBackground if mode is dark', () => {
            expect(getShockBlueColor(Mode.DARK)).toBe(Color.lightDarkBackground);
        });

        it('should return shockBlue if mode is light', () => {
            expect(getShockBlueColor(Mode.LIGHT)).toBe(Color.shockBlue);
        });
    });
});
