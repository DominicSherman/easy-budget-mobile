import React, {FC} from 'react';
import {DefaultTheme, NavigationNativeContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ApolloProvider} from '@apollo/react-hooks';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

import {Route} from './enums/Route';
import {getApolloClient} from './graphql/apollo-client';
import {setAppState} from './redux/action-creators';
import {IAppState} from './redux/reducer';
import {SCREEN_WIDTH} from './constants/dimensions';
import {CloseIcon, HamburgerMenu} from './components/navigation/HeaderComponents';
import {MAIN_SCREENS, MODALS} from './screens';
import {colors} from './constants/colors';
import {useMode} from './redux/hooks';
import {Mode} from './enums/Mode';
import {AppStatus} from './enums/AppStatus';
import LoadingView from './components/generic/LoadingView';
import ErrorView from './components/generic/ErrorView';
import Login from './screens/Login';

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
    const theme = useMode() === Mode.DARK ? DarkThemeObject : LightThemeObject;

    const AppStatusToComponent = {
        [AppStatus.LOADING]: (): JSX.Element =>
            <RootStack.Navigator>
                <RootStack.Screen
                    component={LoadingView}
                    name={''}
                />
            </RootStack.Navigator>,
        [AppStatus.ERROR]: (): JSX.Element =>
            <RootStack.Navigator>
                <RootStack.Screen
                    component={ErrorView}
                    name={'Error'}
                />
            </RootStack.Navigator>,
        [AppStatus.LOGGED_OUT]: (): JSX.Element =>
            <RootStack.Navigator>
                <RootStack.Screen
                    component={Login}
                    name={Route.LOGIN}
                />
            </RootStack.Navigator>,
        [AppStatus.LOGGED_IN]: (): JSX.Element =>
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
    };
    const Component = AppStatusToComponent[appStatus];

    return (
        <NavigationNativeContainer theme={theme}>
            <ApolloProvider client={getApolloClient()}>
                <Component />
            </ApolloProvider>
        </NavigationNativeContainer>
    );
};

export default App;
