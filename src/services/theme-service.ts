import {Mode} from '../enums/Mode';
import {colors} from '../constants/colors';

export const getBackgroundColor = (mode): string =>
    mode === Mode.DARK ? colors.darkGrey : colors.white;

export const getPrimaryColor = (mode): string =>
    mode === Mode.DARK ? colors.white : colors.dark;
