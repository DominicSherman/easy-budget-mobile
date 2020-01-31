import React, {FC} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../../screens/Home';
import {Route} from '../../enums/routes';
import FixedCategories from '../../screens/FixedCategories';
import VariableCategories from '../../screens/VariableCategories';
import Expenses from '../../screens/Expenses';
import DateTimePicker, {IDateTimePickerProps} from '../../screens/DateTimePicker';

import {HamburgerMenu} from './HeaderComponents';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type StackParams = {
    [Route.HOME]: undefined
    [Route.FIXED_CATEGORIES]: undefined
    [Route.VARIABLE_CATEGORIES]: undefined
    [Route.EXPENSES]: undefined
    [Route.DATE_PICKER]: IDateTimePickerProps
}
const Stack = createStackNavigator<StackParams>();

const options = {
    headerLeft: (): JSX.Element => <HamburgerMenu />
};

export const HomeStack: FC = () =>
    <Stack.Navigator mode={'modal'}>
        <Stack.Screen
            component={Home}
            name={Route.HOME}
            options={options}
        />
        <Stack.Screen
            component={DateTimePicker}
            initialParams={{
                date: new Date(),
                setDate: (): void => {},
                title: ''
            }}
            name={Route.DATE_PICKER}
            options={{headerShown: false}}
        />
    </Stack.Navigator>;

export const FixedCategoriesStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={FixedCategories}
            name={Route.FIXED_CATEGORIES}
            options={options}
        />
    </Stack.Navigator>;

export const VariableCategoriesStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={VariableCategories}
            name={Route.VARIABLE_CATEGORIES}
            options={options}
        />
    </Stack.Navigator>;

export const ExpensesStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={Expenses}
            name={Route.EXPENSES}
            options={options}
        />
    </Stack.Navigator>;
