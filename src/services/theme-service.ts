import {Mode} from '../enums/Mode';
import {Color} from '../constants/color';

export const getBackgroundColor = (mode): Color =>
    mode === Mode.DARK ? Color.darkGrey : Color.white;

export const getPrimaryColor = (mode): Color =>
    mode === Mode.DARK ? Color.white : Color.dark;

export const getDarkBlueColor = (mode): Color =>
    mode === Mode.DARK ? Color.white : Color.darkNavy;
