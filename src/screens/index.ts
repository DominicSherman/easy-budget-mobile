import {Route} from '../enums/routes';
import FixedCategory from '../components/budget/FixedCategory';

import Home from './Home';
import VariableCategories from './VariableCategories';
import Expenses from './Expenses';
import Account from './Account';
import DateTimePicker from './DateTimePicker';
import FixedCategories from './FixedCategories';

export const MAIN_SCREENS = {
    [Route.HOME]: Home,
    [Route.FIXED_CATEGORIES]: FixedCategories,
    [Route.VARIABLE_CATEGORIES]: VariableCategories,
    [Route.EXPENSES]: Expenses,
    [Route.ACCOUNT]: Account
};

export const MODALS = {
    [Route.DATE_PICKER]: DateTimePicker,
    [Route.FIXED_CATEGORY]: FixedCategory
};
