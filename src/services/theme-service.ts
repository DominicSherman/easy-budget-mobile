import {Mode} from '../enums/Mode';
import {Color} from '../constants/color';

export enum Theme {
    BLUE = 'blue',
    GREEN = 'green',
    GOLD = 'gold',
    RED = 'red'
}

interface IThemeObject {
    backgroundColor: Color
    selectedColor: Color
    textColor: Color
}

interface IRootThemeObject {
    [Mode.DARK]: {
        [key in Theme]: IThemeObject
    }
    [Mode.LIGHT]: {
        [key in Theme]: IThemeObject
    }
}
const themeObject: IRootThemeObject = {
    [Mode.DARK]: {
        [Theme.BLUE]: {
            backgroundColor: Color.backgroundBlueDark,
            selectedColor: Color.backgroundBlueDark,
            textColor: Color.white
        },
        [Theme.GREEN]: {
            backgroundColor: Color.selectedGreen,
            selectedColor: Color.selectedGreen,
            textColor: Color.white
        },
        [Theme.GOLD]: {
            backgroundColor: Color.selectedGold,
            selectedColor: Color.selectedGold,
            textColor: Color.white
        },
        [Theme.RED]: {
            backgroundColor: Color.backgroundRedDark,
            selectedColor: Color.backgroundRedDark,
            textColor: Color.white
        }
    },
    [Mode.LIGHT]: {
        [Theme.BLUE]: {
            backgroundColor: Color.backgroundBlue,
            selectedColor: Color.shockBlue,
            textColor: Color.shockBlue
        },
        [Theme.GREEN]: {
            backgroundColor: Color.backgroundGreen,
            selectedColor: Color.selectedGreen,
            textColor: Color.selectedGreen
        },
        [Theme.GOLD]: {
            backgroundColor: Color.backgroundGold,
            selectedColor: Color.selectedGold,
            textColor: Color.selectedGold
        },
        [Theme.RED]: {
            backgroundColor: Color.backgroundRed,
            selectedColor: Color.selectedRed,
            textColor: Color.selectedRed
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

export const getThemedSelectedColor = (mode: Mode, theme: Theme): Color =>
    themeObject[mode][theme].selectedColor;

export const getPrimaryColor = (mode: Mode): Color =>
    isDark(mode) ? Color.white : Color.dark;

export const getDarkBlueColor = (mode: Mode): Color =>
    isDark(mode) ? Color.white : Color.darkNavy;

export const getShockBlueColor = (mode: Mode): Color =>
    isDark(mode) ? Color.lightDarkBackground : Color.shockBlue;
