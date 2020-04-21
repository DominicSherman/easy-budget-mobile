import React, {FC, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/react-hooks';
import {useSelector} from 'react-redux';
import {useDarkMode} from 'react-native-dark-mode';
import DropdownAlert from 'react-native-dropdownalert';

import {getApolloClient} from './graphql/apollo-client';
import {setAppState} from './redux/action-creators';
import {RootNavigator} from './StacksOnStacksOnStacks';
import {Color} from './constants/color';
import {useMode} from './utils/hooks';
import {Mode} from './enums/Mode';
import {IAppState} from './redux/reducer';
import {dispatchAction} from './redux/store';
import {Actions} from './redux/actions';
import {DropdownRef} from './services/alert-service';

const LightThemeObject = {
    colors: {
        background: Color.lightGrey,
        border: Color.white,
        card: Color.white,
        primary: Color.dark,
        text: Color.dark
    },
    dark: false
};

const DarkThemeObject = {
    colors: {
        background: Color.offBlack,
        border: Color.dark,
        card: Color.dark,
        primary: Color.white,
        text: Color.white
    },
    dark: true
};

const App: FC = () => {
    const isDarkMode = useDarkMode();
    const mode = isDarkMode ? Mode.DARK : Mode.LIGHT;

    useEffect(() => {
        setAppState();
    }, []);
    useEffect(() => {
        dispatchAction(Actions.SET_MODE, mode);
    }, [mode]);
    const theme = useMode() === Mode.DARK ? DarkThemeObject : LightThemeObject;
    const appStatus = useSelector((state: IAppState) => state.appStatus);

    return (
        <NavigationContainer theme={theme}>
            <ApolloProvider client={getApolloClient()}>
                <RootNavigator appStatus={appStatus} />
            </ApolloProvider>
            <DropdownAlert ref={DropdownRef} />
        </NavigationContainer>
    );
};

export default App;
