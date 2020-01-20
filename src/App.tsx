import React, {FC} from 'react';
import {DefaultTheme, NavigationNativeContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ApolloProvider} from '@apollo/react-hooks';
import {Provider, useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

import {Route} from './enums/routes';
import Home from './screens/Home';
import FixedCategories from './screens/FixedCategories';
import VariableCategories from './screens/VariableCategories';
import {getApolloClient} from './graphql/apollo-client';
import {getStore} from './redux/store';
import {HamburgerMenu} from './components/navigation/HeaderComponents';
import {setAppState} from './redux/action-creators';
import LoadingView from './components/LoadingView';
import Login from './screens/Login';
import {IAppState} from './redux/reducer';
import {AppStatus} from './enums/app-status';
import ErrorView from './components/ErrorView';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const options = {
    headerLeft: (): JSX.Element => <HamburgerMenu />
};

const HomeStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={Home}
            name={Route.HOME}
            options={options}
        />
    </Stack.Navigator>;

const FixedCategoriesStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={FixedCategories}
            name={Route.FIXED_CATEGORIES}
            options={options}
        />
    </Stack.Navigator>;

const VariableCategoriesStack: FC = () =>
    <Stack.Navigator>
        <Stack.Screen
            component={VariableCategories}
            name={Route.VARIABLE_CATEGORIES}
            options={options}
        />
    </Stack.Navigator>;

const LightTheme = {
    colors: {
        ...DefaultTheme.colors,
        background: 'rgb(255, 255, 255)'
    },
    dark: false
};

const App: FC = () => {
    React.useEffect(() => {
        setAppState();
    }, []);
    const appStatus = useSelector((state: IAppState) => state.appStatus);

    if (appStatus === AppStatus.LOADING) {
        return <LoadingView />;
    }

    if (appStatus === AppStatus.LOGGED_OUT) {
        return <Login />;
    }

    if (appStatus === AppStatus.ERROR) {
        return <ErrorView />;
    }

    return (
        <NavigationNativeContainer theme={LightTheme}>
            <ApolloProvider client={getApolloClient()}>
                <Drawer.Navigator>
                    <Drawer.Screen
                        component={HomeStack}
                        name={Route.HOME}
                    />
                    <Drawer.Screen
                        component={FixedCategoriesStack}
                        name={Route.FIXED_CATEGORIES}
                    />
                    <Drawer.Screen
                        component={VariableCategoriesStack}
                        name={Route.VARIABLE_CATEGORIES}
                    />
                </Drawer.Navigator>
            </ApolloProvider>
        </NavigationNativeContainer>
    );
};

export default () =>
    <Provider store={getStore()}>
        <App />
    </Provider>;
