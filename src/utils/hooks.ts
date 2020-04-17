import {useSelector} from 'react-redux';
import {User} from '@react-native-community/google-signin';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {Mode} from '../enums/Mode';
import {
    getDarkBlueColor,
    getPrimaryBackgroundColor,
    getPrimaryColor,
    getSecondaryBackgroundColor, getShockBlueColor,
    getThemedBackgroundColor,
    getThemedTextColor,
    Theme
} from '../services/theme-service';
import {IAppState} from '../redux/reducer';
import {ScreenParams} from '../StacksOnStacksOnStacks';
import {Color} from '../constants/color';

export const useMode = (): Mode =>
    useSelector<IAppState, Mode>((state) => state.mode);

export const usePrimaryColor = (): Color =>
    getPrimaryColor(useMode());

export const usePrimaryBackgroundColor = (): Color =>
    getPrimaryBackgroundColor(useMode());

export const useSecondaryBackgroundColor = (): Color =>
    getSecondaryBackgroundColor(useMode());

export const useThemedBackgroundColor = (theme: Theme): Color =>
    getThemedBackgroundColor(useMode(), theme);

export const useThemedTextColor = (theme: Theme): Color =>
    getThemedTextColor(useMode(), theme);

export const useTheme = (theme: Theme): {
    backgroundColor: Color
    textColor: Color
} => ({
    backgroundColor: getThemedBackgroundColor(useMode(), theme),
    textColor: getThemedTextColor(useMode(), theme)
});

export const useDarkBlueColor = (): Color =>
    getDarkBlueColor(useMode());

export const useShockBlueColor = (): Color =>
    getShockBlueColor(useMode());

export const useSecondaryTextColor = (): Color => Color.grey;

export const useTimePeriodId = (): string =>
    useSelector<IAppState, string>((state) => state.timePeriodId);

export const useUserInformation = (): User =>
    useSelector<IAppState, User>((state) => state.userInformation);

export const useBudgetNavigation = (): NavigationProp<ScreenParams> =>
    useNavigation<NavigationProp<ScreenParams>>();
