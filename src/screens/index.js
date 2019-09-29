import {Navigation} from 'react-native-navigation';

import {FIXED_EXPENSES, HOME, VARIABLE_EXPENSES} from '../constants/routes';
import App from './App';
import FixedExpenses from './FixedExpenses';
import VariableExpenses from './VariableExpenses';
import {ReactElement} from 'react';

interface IScreen {
  component: ReactElement;
  route: string;
}
export const screens: IScreen[] = [
  {
    component: App,
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
];

export const registerScreens = () => {
  screens.forEach(screen => {
    Navigation.registerComponent(screen.route, () => screen.component);
  });
};
