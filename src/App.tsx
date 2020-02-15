import React, {FC} from 'react';
import {DarkTheme, DefaultTheme, NavigationNativeContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ApolloProvider} from '@apollo/react-hooks';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

import {Route} from './enums/Route';
import {getApolloClient} from './graphql/apollo-client';
import {setAppState} from './redux/action-creators';
import LoadingView from './components/generic/LoadingView';
import Login from './screens/Login';
import {IAppState} from './redux/reducer';
import {AppStatus} from './enums/AppStatus';
import ErrorView from './components/generic/ErrorView';
import {SCREEN_WIDTH} from './constants/dimensions';
import {CloseIcon, HamburgerMenu} from './components/navigation/HeaderComponents';
import {MAIN_SCREENS, MODALS} from './screens';
import {colors} from './constants/colors';

const LightThemeObject = {
    colors: {
        ...DefaultTheme.colors,
        background: 'rgb(255, 255, 255)'
    },
    dark: false
};

const DarkThemeObject = {
    colors: {
        background: colors.dark,
        border: colors.black,
        card: colors.black,
        primary: colors.white,
        text: colors.white
    },
    dark: true
};

const Stack = createStackNavigator();
const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const screenOptions = {
    headerLeft: (): JSX.Element => <HamburgerMenu />
};
const modalOptions = {
    headerLeft: (): JSX.Element => <CloseIcon />
};

const DrawerNavigator = (): JSX.Element =>
    <Drawer.Navigator
        drawerType={'slide'}
        edgeWidth={SCREEN_WIDTH / 3}
    >
        {
            Object.keys(MAIN_SCREENS).map<JSX.Element>((route) =>
                <Drawer.Screen
                    component={
                        (): JSX.Element =>
                            <Stack.Navigator>
                                <Stack.Screen
                                    component={MAIN_SCREENS[route]}
                                    name={route}
                                    options={screenOptions}
                                />
                            </Stack.Navigator>
                    }
                    key={route}
                    name={route}
                />
            )
        }
    </Drawer.Navigator>;

const App: FC = () => {
    React.useEffect(() => {
        setAppState();
    }, []);
    const appStatus = useSelector((state: IAppState) => state.appStatus);

    switch (appStatus) {
        case AppStatus.LOGGED_IN:
            return (
                <NavigationNativeContainer theme={DarkThemeObject}>
                    <ApolloProvider client={getApolloClient()}>
                        <RootStack.Navigator
                            headerMode={'screen'}
                            mode={'modal'}
                        >
                            <RootStack.Screen
                                component={DrawerNavigator}
                                name={Route.HOME}
                                options={{headerShown: false}}
                            />
                            {
                                Object.keys(MODALS).map<JSX.Element>((route) =>
                                    <RootStack.Screen
                                        component={MODALS[route]}
                                        key={route}
                                        name={route}
                                        options={modalOptions}
                                    />
                                )
                            }
                        </RootStack.Navigator>
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
