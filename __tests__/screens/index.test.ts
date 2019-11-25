import {Navigation} from 'react-native-navigation';

import Home from '../../src/screens/Home';
import {Route} from '../../src/constants/routes';
import FixedCategories from '../../src/screens/FixedCategories';
import VariableCategories from '../../src/screens/VariableCategories';
import Login from '../../src/screens/Login';
import {registerScreens} from '../../src/screens';
import {asScreen} from '../../src/services/screen-wrapper';

jest.mock('react-native-navigation', () => ({
    Navigation: {
        registerComponent: jest.fn()
    }
}));
jest.mock('../../src/services/screen-wrapper');

const expectedScreens = [
    {
        component: Home,
        route: Route.HOME
    },
    {
        component: FixedCategories,
        route: Route.FIXED_EXPENSES
    },
    {
        component: VariableCategories,
        route: Route.VARIABLE_EXPENSES
    },
    {
        component: Login,
        route: Route.LOGIN
    }
];

describe('screens index', () => {
    describe('registerScreens', () => {
        it('should register each screen', () => {
            registerScreens();

            expect(Navigation.registerComponent).toHaveBeenCalledTimes(expectedScreens.length);

            expectedScreens.forEach((screen, index) => {
                expect(Navigation.registerComponent).toHaveBeenCalledWith(screen.route, expect.any(Function));

                // @ts-ignore
                Navigation.registerComponent.mock.calls[index][1]();

                expect(asScreen).toHaveBeenCalledWith(screen.component);
            });
        });
    });
});
