import React, {FC} from 'react';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Route} from './enums/Route';
import {BackButton, CloseIcon, HamburgerMenu, InfoIcon} from './components/navigation/HeaderComponents';
import {SCREEN_WIDTH} from './constants/dimensions';
import {AppStatus} from './enums/AppStatus';
import LoadingView from './components/generic/LoadingView';
import ErrorView from './components/generic/ErrorView';
import Information, {IInformationProps} from './screens/Information';
import VariableCategory, {IVariableCategoryProps} from './screens/VariableCategory';
import Expense, {IExpenseProps} from './screens/Expense';
import DateTimePicker, {IDateTimePickerProps} from './screens/DateTimePicker';
import VariableCategories from './screens/VariableCategories';
import Login from './screens/Login';
import Home from './screens/Home';
import Savings from './screens/Savings';
import Expenses from './screens/Expenses';
import FixedCategories from './screens/FixedCategories';
import Settings from './screens/Settings';
import Income from './screens/Income';
import Debt from './screens/Debt';
import {textStyles} from './styles/text-styles';
import LeftSideMenu from './components/navigation/LeftSideMenu';
import {shadow} from './styles/shared-styles';
import {getDarkBlueColor} from './services/theme-service';
import {useMode} from './utils/hooks';

const getScreenOptions = (mode): StackNavigationOptions => ({
    headerLeft: (): JSX.Element => <HamburgerMenu />,
    headerStyle: {
        ...shadow
    },
    headerTitleStyle: {
        ...textStyles.title,
        color: getDarkBlueColor(mode)
    }
});

const getSecondaryScreenOptions = (mode): StackNavigationOptions => ({
    headerLeft: (): JSX.Element => <BackButton />,
    headerStyle: {
        ...shadow
    },
    headerTitleStyle: {
        ...textStyles.title,
        color: getDarkBlueColor(mode)
    }
});

const modalOptions: StackNavigationOptions = {
    headerLeft: (): JSX.Element => <CloseIcon />,
    headerStyle: {
        ...shadow
    },
    headerTitle: ''
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ScreenParams = {
    [Route.DATE_PICKER]: IDateTimePickerProps
    [Route.DEBT]: {}
    [Route.DRAWER]: {}
    [Route.ERROR]: {}
    [Route.EXPENSE]: IExpenseProps
    [Route.EXPENSES]: {}
    [Route.FIXED_CATEGORIES]: {}
    [Route.HOME]: {}
    [Route.INCOME]: {}
    [Route.INFORMATION]: IInformationProps
    [Route.LOADING]: {}
    [Route.LOGIN]: {}
    [Route.ROOT_STACK]: {}
    [Route.SAVINGS]: {}
    [Route.SETTINGS]: {}
    [Route.VARIABLE_CATEGORIES]: {}
    [Route.VARIABLE_CATEGORY]: IVariableCategoryProps
}

const Stack = createStackNavigator<ScreenParams>();
const Drawer = createDrawerNavigator();

const HomeStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={Home}
            name={Route.HOME}
            options={{
                ...getScreenOptions(useMode()),
                headerRight: (): JSX.Element => <InfoIcon />
            }}
        />
    </Stack.Navigator>;

const VariableCategoriesStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={VariableCategories}
            name={Route.VARIABLE_CATEGORIES}
            options={getScreenOptions(useMode())}
        />
        <Stack.Screen
            component={VariableCategory}
            name={Route.VARIABLE_CATEGORY}
            options={{
                ...getSecondaryScreenOptions(useMode()),
                title: 'VARIABLE'
            }}
        />
    </Stack.Navigator>;

const FixedCategoriesStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={FixedCategories}
            name={Route.FIXED_CATEGORIES}
            options={getScreenOptions(useMode())}
        />
    </Stack.Navigator>;

const ExpensesStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={Expenses}
            name={Route.EXPENSES}
            options={getScreenOptions(useMode())}
        />
    </Stack.Navigator>;

const SettingsStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={Settings}
            name={Route.SETTINGS}
            options={getScreenOptions(useMode())}
        />
    </Stack.Navigator>;

const SavingsStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={Savings}
            name={Route.SAVINGS}
            options={getScreenOptions(useMode())}
        />
    </Stack.Navigator>;

const DebtStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={Debt}
            name={Route.DEBT}
            options={getScreenOptions(useMode())}
        />
    </Stack.Navigator>;

const IncomeStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={Income}
            name={Route.INCOME}
            options={getScreenOptions(useMode())}
        />
    </Stack.Navigator>;

const DrawerNavigator: FC = () =>
    <Drawer.Navigator
        drawerContent={(props): JSX.Element => <LeftSideMenu {...props} />}
        drawerType={'slide'}
        edgeWidth={SCREEN_WIDTH / 3}
        initialRouteName={Route.HOME}
    >
        <Drawer.Screen
            component={HomeStack}
            name={Route.HOME}
        />
        <Drawer.Screen
            component={VariableCategoriesStack}
            name={Route.VARIABLE_CATEGORIES}
        />
        <Drawer.Screen
            component={FixedCategoriesStack}
            name={Route.FIXED_CATEGORIES}
        />
        <Drawer.Screen
            component={ExpensesStack}
            name={Route.EXPENSES}
        />
        <Drawer.Screen
            component={IncomeStack}
            name={Route.INCOME}
        />
        <Drawer.Screen
            component={SavingsStack}
            name={Route.SAVINGS}
        />
        <Drawer.Screen
            component={DebtStack}
            name={Route.DEBT}
        />
        <Drawer.Screen
            component={SettingsStack}
            name={Route.SETTINGS}
        />
    </Drawer.Navigator>;

const RootStack: FC = () =>
    <Stack.Navigator
        headerMode={'screen'}
        mode={'modal'}
    >
        <Stack.Screen
            component={DrawerNavigator}
            name={Route.DRAWER}
            options={{headerShown: false}}
        />
        <Stack.Screen
            component={DateTimePicker}
            name={Route.DATE_PICKER}
            options={modalOptions}
        />
        <Stack.Screen
            component={Expense}
            name={Route.EXPENSE}
            options={modalOptions}
        />
        <Stack.Screen
            component={Information}
            name={Route.INFORMATION}
            options={modalOptions}
        />
    </Stack.Navigator>;

export const RootNavigator: FC<{appStatus: AppStatus}> = ({appStatus}) =>
    <Stack.Navigator>
        {
            appStatus === AppStatus.LOADING ?
                <Stack.Screen
                    component={LoadingView}
                    name={Route.LOADING}
                    options={{headerTitle: ''}}
                /> : null
        }
        {
            appStatus === AppStatus.ERROR ?
                <Stack.Screen
                    component={ErrorView}
                    name={Route.ERROR}
                /> : null
        }
        {
            appStatus === AppStatus.LOGGED_OUT ?
                <Stack.Screen
                    component={Login}
                    name={Route.LOGIN}
                    options={{animationTypeForReplace: 'pop'}}
                /> : null

        }
        {
            appStatus === AppStatus.LOGGED_IN ?
                <Stack.Screen
                    component={RootStack}
                    name={Route.ROOT_STACK}
                    options={{headerShown: false}}
                /> : null
        }
    </Stack.Navigator>;
