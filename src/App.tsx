import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/react-hooks';
import {useSelector} from 'react-redux';

import {getApolloClient} from './graphql/apollo-client';
import {setAppState} from './redux/action-creators';
import {RootNavigator} from './StacksOnStacksOnStacks';
import {Color} from './constants/color';
import {useMode} from './utils/hooks';
import {Mode} from './enums/Mode';
import {IAppState} from './redux/reducer';

const LightThemeObject = {
    colors: {
        background: Color.lightGrey,
        border: Color.white,
        card: Color.white,
        primary: Color.darkFont,
        text: Color.darkFont
    },
    dark: false
};

const DarkThemeObject = {
    colors: {
        background: Color.dark,
        border: Color.black,
        card: Color.black,
        primary: Color.white,
        text: Color.white
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
