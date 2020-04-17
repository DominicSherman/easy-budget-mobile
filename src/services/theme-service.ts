import {Mode} from '../enums/Mode';
import {Color} from '../constants/color';

export enum Theme {
    BLUE = 'blue'
}

interface IThemeObject {
    backgroundColor: Color
    textColor: Color
}

interface IThemedObject {
    [Theme.BLUE]: IThemeObject
}

interface IRootThemeObject {
    [Mode.DARK]: IThemedObject
    [Mode.LIGHT]: IThemedObject
}
const themeObject: IRootThemeObject = {
    [Mode.DARK]: {
        [Theme.BLUE]: {
            backgroundColor: Color.backgroundBlueDark,
            textColor: Color.white
        }
    },
    [Mode.LIGHT]: {
        [Theme.BLUE]: {
            backgroundColor: Color.backgroundBlue,
            textColor: Color.selectedBlue
        }
    }
};

const isDark = (mode: Mode): boolean => mode === Mode.DARK;

export const getPrimaryBackgroundColor = (mode: Mode): Color =>
    isDark(mode) ? Color.offBlack : Color.lightGrey;

export const getSecondaryBackgroundColor = (mode: Mode): Color =>
    isDark(mode) ? Color.darkGrey : Color.white;

export const getThemedBackgroundColor = (mode: Mode, theme: Theme): Color =>
    themeObject[mode][theme].backgroundColor;

export const getThemedTextColor = (mode: Mode, theme: Theme): Color =>
    themeObject[mode][theme].textColor;

export const getPrimaryColor = (mode: Mode): Color =>
    isDark(mode) ? Color.white : Color.dark;

export const getDarkBlueColor = (mode: Mode): Color =>
    isDark(mode) ? Color.white : Color.darkNavy;

export const getShockBlueColor = (mode: Mode): Color =>
    isDark(mode) ? Color.lightDarkBackground : Color.shockBlue;
