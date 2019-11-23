import {Navigation} from 'react-native-navigation';
import {FC} from 'react';

import {routes} from '../constants/routes';
import {asScreen} from '../services/screen-wrapper';

import Home from './Home';
import FixedCategories from './FixedCategories';
import VariableCategories from './VariableCategories';
import Login from './Login';

interface IScreen {
  component: FC
  route: string
}

const screens: IScreen[] = [
    {
        component: Home,
        route: routes.HOME
    },
    {
        component: FixedCategories,
        route: routes.FIXED_EXPENSES
    },
    {
        component: VariableCategories,
        route: routes.VARIABLE_EXPENSES
    },
    {
        component: Login,
        route: routes.LOGIN
    }
];

export const registerScreens = (): void => {
    screens.forEach((screen) => {
        Navigation.registerComponent(screen.route, () => asScreen(screen.component));
    });
};
