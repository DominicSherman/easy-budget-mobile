import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Route} from './enums/Route';
import {CloseIcon, HamburgerMenu, InfoIcon} from './components/navigation/HeaderComponents';
import {SCREEN_WIDTH} from './constants/dimensions';
import {AppStatus} from './enums/AppStatus';
import LoadingView from './components/generic/LoadingView';
import ErrorView from './components/generic/ErrorView';
import Home from './screens/Home';
import VariableCategories from './screens/VariableCategories';
import FixedCategories from './screens/FixedCategories';
import VariableCategory, {IVariableCategoryProps} from './screens/VariableCategory';
import Expenses from './screens/Expenses';
import Settings from './screens/Settings';
import DateTimePicker, {IDateTimePickerProps} from './screens/DateTimePicker';
import Expense, {IExpenseProps} from './screens/Expense';
import Login from './screens/Login';
import Information, {IInformationProps} from './screens/Information';

const screenOptions = {
    headerLeft: (): JSX.Element => <HamburgerMenu />
};
const modalOptions = {
    headerLeft: (): JSX.Element => <CloseIcon />,
    headerTitle: ''
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type ScreenParams = {
    [Route.HOME]: {}
    [Route.FIXED_CATEGORIES]: {}
    [Route.VARIABLE_CATEGORIES]: {}
    [Route.EXPENSES]: {}
    [Route.EXPENSE]: IExpenseProps
    [Route.DATE_PICKER]: IDateTimePickerProps
    [Route.SETTINGS]: {}
    [Route.VARIABLE_CATEGORY]: IVariableCategoryProps
    [Route.LOADING]: {}
    [Route.ERROR]: {}
    [Route.LOGIN]: {}
    [Route.INFORMATION]: IInformationProps
}

const Stack = createStackNavigator<ScreenParams>();
const Drawer = createDrawerNavigator();

const HomeStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={Home}
            name={Route.HOME}
            options={{
                ...screenOptions,
                headerRight: (): JSX.Element => <InfoIcon />
            }}
        />
    </Stack.Navigator>;

const VariableCategoriesStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={VariableCategories}
            name={Route.VARIABLE_CATEGORIES}
            options={screenOptions}
        />
        <Stack.Screen
            component={VariableCategory}
            name={Route.VARIABLE_CATEGORY}
            options={{headerTitle: ''}}
        />
    </Stack.Navigator>;

const FixedCategoriesStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={FixedCategories}
            name={Route.FIXED_CATEGORIES}
            options={screenOptions}
        />
    </Stack.Navigator>;

const ExpensesStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={Expenses}
            name={Route.EXPENSES}
            options={screenOptions}
        />
    </Stack.Navigator>;

const SettingsStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={Settings}
            name={Route.SETTINGS}
            options={screenOptions}
        />
    </Stack.Navigator>;

const DrawerNavigator: FC = () =>
    <Drawer.Navigator
        drawerType={'slide'}
        edgeWidth={SCREEN_WIDTH / 3}
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
            name={Route.HOME}
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
                    name={Route.HOME}
                    options={{headerShown: false}}
                /> : null
        }
    </Stack.Navigator>;
