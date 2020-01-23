import React, {FC} from 'react';
import {DefaultTheme, NavigationNativeContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ApolloProvider} from '@apollo/react-hooks';
import {useSelector} from 'react-redux';

import {Route} from './enums/routes';
import {getApolloClient} from './graphql/apollo-client';
import {setAppState} from './redux/action-creators';
import LoadingView from './components/LoadingView';
import Login from './screens/Login';
import {IAppState} from './redux/reducer';
import {AppStatus} from './enums/app-status';
import ErrorView from './components/ErrorView';
import {
    ExpensesStack,
    FixedCategoriesStack,
    HomeStack,
    VariableCategoriesStack
} from './components/navigation/NavigationStacks';

const LightTheme = {
    colors: {
        ...DefaultTheme.colors,
        background: 'rgb(255, 255, 255)'
    },
    dark: false
};

const Drawer = createDrawerNavigator();

const App: FC = () => {
    React.useEffect(() => {
        setAppState();
    }, []);
    const appStatus = useSelector((state: IAppState) => state.appStatus);

    switch (appStatus) {
        case AppStatus.LOGGED_IN:
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
                            <Drawer.Screen
                                component={ExpensesStack}
                                name={Route.EXPENSES}
                            />
                        </Drawer.Navigator>
                    </ApolloProvider>
                </NavigationNativeContainer>
            );
        case AppStatus.LOGGED_OUT:
            return <Login />;
        case AppStatus.ERROR:
            return <ErrorView />;
        default:
            return <LoadingView />;
    }
};

export default App;
