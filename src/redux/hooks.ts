import {useSelector} from 'react-redux';
import {User} from '@react-native-community/google-signin';

import {Mode} from '../enums/Mode';
import {getBackgroundColor, getPrimaryColor} from '../services/theme-service';

import {IAppState} from './reducer';

export const useMode = (): Mode =>
    useSelector<IAppState, Mode>((state) => state.mode);

export const usePrimaryColor = (): string =>
    getPrimaryColor(useMode());

export const useBackgroundColor = (): string =>
    getBackgroundColor(useMode());

export const useTextColor = (): {color: string} => ({color: usePrimaryColor()});

export const useTimePeriodId = (): string =>
    useSelector<IAppState, string>((state) => state.timePeriodId);

export const useUserInformation = (): User =>
    useSelector<IAppState, User>((state) => state.userInformation);
