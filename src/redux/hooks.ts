import {useSelector} from 'react-redux';

import {Mode} from '../enums/mode';
import {colors} from '../constants/colors';

import {IAppState} from './reducer';

export const useMode = (): Mode =>
    useSelector<IAppState, Mode>((state) => state.mode);

export const usePrimaryColor = (): string =>
    useMode() === Mode.DARK ? colors.white : colors.dark;

export const useTextColor = (): {color: string} => ({color: usePrimaryColor()});
