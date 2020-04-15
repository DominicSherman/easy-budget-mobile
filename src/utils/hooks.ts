import {useSelector} from 'react-redux';
import {User} from '@react-native-community/google-signin';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {Mode} from '../enums/Mode';
import {getBackgroundColor, getPrimaryColor, getDarkBlueColor} from '../services/theme-service';
import {IAppState} from '../redux/reducer';
import {ScreenParams} from '../StacksOnStacksOnStacks';
import {Color} from '../constants/color';

export const useMode = (): Mode =>
    useSelector<IAppState, Mode>((state) => state.mode);

export const usePrimaryColor = (): Color =>
    getPrimaryColor(useMode());

export const useBackgroundColor = (): Color =>
    getBackgroundColor(useMode());

export const useDarkBlueColor = (): Color =>
    getDarkBlueColor(useMode());

export const useSecondaryTextColor = (): Color => Color.grey;

export const useTimePeriodId = (): string =>
    useSelector<IAppState, string>((state) => state.timePeriodId);

export const useUserInformation = (): User =>
    useSelector<IAppState, User>((state) => state.userInformation);

export const useBudgetNavigation = (): NavigationProp<ScreenParams> =>
    useNavigation<NavigationProp<ScreenParams>>();
