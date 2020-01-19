import {Navigation} from 'react-native-navigation';
import {FC} from 'react';

import {Route} from '../enums/routes';
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
        route: Route.HOME
    },
    {
        component: FixedCategories,
        route: Route.FIXED_CATEGORIES
    },
    {
        component: VariableCategories,
        route: Route.VARIABLE_CATEGORIES
    },
    {
        component: Login,
        route: Route.LOGIN
    }
];

export const registerScreens = (): void => {
    screens.forEach((screen) => {
        Navigation.registerComponent(screen.route, () => asScreen(screen.component));
    });
};
