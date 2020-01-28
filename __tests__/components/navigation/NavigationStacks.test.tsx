import {createStackNavigator} from '@react-navigation/stack';

import {
    ExpensesStack,
    FixedCategoriesStack,
    HomeStack,
    VariableCategoriesStack
} from '../../../src/components/navigation/NavigationStacks';
import Home from '../../../src/screens/Home';
import {Route} from '../../../src/enums/routes';
import FixedCategories from '../../../src/screens/FixedCategories';
import VariableCategories from '../../../src/screens/VariableCategories';
import Expenses from '../../../src/screens/Expenses';
import {HamburgerMenu} from '../../../src/components/navigation/HeaderComponents';

jest.mock('@react-navigation/stack');

describe('NavigationStacks', () => {
    const Stack = createStackNavigator();

    describe('HomeStack', () => {
        let renderedComponent,
            renderedScreen;

        beforeEach(() => {
            renderedComponent = HomeStack({});
            renderedScreen = renderedComponent.props.children;
        });

        it('should return a Stack.Navigator', () => {
            expect(renderedComponent.type).toBe(Stack.Navigator);
        });

        it('should return a nested Stack.Screen', () => {
            expect(renderedScreen.type).toBe(Stack.Screen);
            expect(renderedScreen.props.component).toBe(Home);
            expect(renderedScreen.props.name).toBe(Route.HOME);
            expect(renderedScreen.props.options.headerLeft().type).toBe(HamburgerMenu);
        });
    });

    describe('FixedCategoriesStack', () => {
        let renderedComponent,
            renderedScreen;

        beforeEach(() => {
            renderedComponent = FixedCategoriesStack({});
            renderedScreen = renderedComponent.props.children;
        });

        it('should return a Stack.Navigator', () => {
            expect(renderedComponent.type).toBe(Stack.Navigator);
        });

        it('should return a nested Stack.Screen', () => {
            expect(renderedScreen.type).toBe(Stack.Screen);
            expect(renderedScreen.props.component).toBe(FixedCategories);
            expect(renderedScreen.props.name).toBe(Route.FIXED_CATEGORIES);
            expect(renderedScreen.props.options.headerLeft().type).toBe(HamburgerMenu);
        });
    });

    describe('VariableCategoriesStack', () => {
        let renderedComponent,
            renderedScreen;

        beforeEach(() => {
            renderedComponent = VariableCategoriesStack({});
            renderedScreen = renderedComponent.props.children;
        });

        it('should return a Stack.Navigator', () => {
            expect(renderedComponent.type).toBe(Stack.Navigator);
        });

        it('should return a nested Stack.Screen', () => {
            expect(renderedScreen.type).toBe(Stack.Screen);
            expect(renderedScreen.props.component).toBe(VariableCategories);
            expect(renderedScreen.props.name).toBe(Route.VARIABLE_CATEGORIES);
            expect(renderedScreen.props.options.headerLeft().type).toBe(HamburgerMenu);
        });
    });

    describe('ExpensesStack', () => {
        let renderedComponent,
            renderedScreen;

        beforeEach(() => {
            renderedComponent = ExpensesStack({});
            renderedScreen = renderedComponent.props.children;
        });

        it('should return a Stack.Navigator', () => {
            expect(renderedComponent.type).toBe(Stack.Navigator);
        });

        it('should return a nested Stack.Screen', () => {
            expect(renderedScreen.type).toBe(Stack.Screen);
            expect(renderedScreen.props.component).toBe(Expenses);
            expect(renderedScreen.props.name).toBe(Route.EXPENSES);
            expect(renderedScreen.props.options.headerLeft().type).toBe(HamburgerMenu);
        });
    });
});
