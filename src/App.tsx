import React, {FC} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/react-hooks';
import {useSelector} from 'react-redux';

import {getApolloClient} from './graphql/apollo-client';
import {setAppState} from './redux/action-creators';
import {RootNavigator} from './screens';
import {colors} from './constants/colors';
import {useMode} from './redux/hooks';
import {Mode} from './enums/Mode';
import {IAppState} from './redux/reducer';

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

const App: FC = () => {
    React.useEffect(() => {
        setAppState();
    }, []);
    const theme = useMode() === Mode.DARK ? DarkThemeObject : LightThemeObject;
    const appStatus = useSelector((state: IAppState) => state.appStatus);

    return (
        <NavigationContainer theme={theme}>
            <ApolloProvider client={getApolloClient()}>
                <RootNavigator appStatus={appStatus} />
            </ApolloProvider>
        </NavigationContainer>
    );
};

export default App;
