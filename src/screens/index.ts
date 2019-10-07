import {Navigation} from 'react-native-navigation';

import {
  FIXED_EXPENSES,
  HOME,
  LOGIN,
  VARIABLE_EXPENSES,
} from '../constants/routes';
import Home from './Home';
import FixedExpenses from './FixedExpenses';
import VariableExpenses from './VariableExpenses';
import {asScreen} from '../services/screen-wrapper';
import {FC} from 'react';
import Login from './Login';

interface IScreen {
  component: FC;
  route: string;
}

export const screens: IScreen[] = [
  {
    component: Home,
    route: HOME,
  },
  {
    component: FixedExpenses,
    route: FIXED_EXPENSES,
  },
  {
    component: VariableExpenses,
    route: VARIABLE_EXPENSES,
  },
  {
    component: Login,
    route: LOGIN,
  },
];

export const registerScreens = () => {
  screens.forEach(screen => {
    Navigation.registerComponent(screen.route, () =>
      asScreen(screen.component),
    );
  });
};
