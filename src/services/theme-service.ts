import {Mode} from '../enums/Mode';
import {Color} from '../constants/color';

export const getBackgroundColor = (mode): string =>
    mode === Mode.DARK ? Color.darkGrey : Color.white;

export const getPrimaryColor = (mode): string =>
    mode === Mode.DARK ? Color.white : Color.dark;
