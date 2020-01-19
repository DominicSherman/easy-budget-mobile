import React, {FC, useState} from 'react';
import {DefaultTheme, NavigationNativeContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ApolloProvider} from '@apollo/react-hooks';
import {Provider} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

import {Route} from './enums/routes';
import Home from './screens/Home';
import FixedCategories from './screens/FixedCategories';
import VariableCategories from './screens/VariableCategories';
import {getApolloClient} from './graphql/apollo-client';
import {getStore} from './redux/store';
import {HamburgerMenu} from './components/navigation/HeaderComponents';
import {getIsSignedIn} from './services/auth-service';
import {setActiveTimePeriodData} from './redux/action-creators';
import LoadingView from './components/LoadingView';
import Login from './screens/Login';

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

enum StatusType {
    LOADING = 'LOADING',
    LOGGED_IN = 'LOGGED_IN',
    LOGGED_OUT = 'LOGGED_OUT'
}

const App: FC = () => {
    const [status, setStatus] = useState<StatusType>(StatusType.LOADING);

    React.useEffect(() => {
        const bootstrapAsync = async (): Promise<void> => {
            const isSignedIn = await getIsSignedIn();

            if (isSignedIn) {
                await setActiveTimePeriodData();

                setStatus(StatusType.LOGGED_IN);
            } else {
                setStatus(StatusType.LOGGED_OUT);
            }
        };

        bootstrapAsync();
    }, []);

    console.log('status', status);

    if (status === StatusType.LOADING) {
        return <LoadingView />;
    }

    if (status === StatusType.LOGGED_OUT) {
        return <Login />;
    }

    return (
        <NavigationNativeContainer theme={LightTheme}>
            <ApolloProvider client={getApolloClient()}>
                <Provider store={getStore()}>
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
                </Provider>
            </ApolloProvider>
        </NavigationNativeContainer>
    );
};

export default App;
