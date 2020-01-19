import React, {FC} from 'react';
import {NavigationNativeContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ApolloProvider} from '@apollo/react-hooks';
import {Provider} from 'react-redux';

import {Route} from './constants/routes';
import Home from './screens/Home';
import FixedCategories from './screens/FixedCategories';
import VariableCategories from './screens/VariableCategories';
import {getApolloClient} from './graphql/apollo-client';
import {getStore} from './redux/store';

const Drawer = createDrawerNavigator();

const App: FC = () =>
    <NavigationNativeContainer>
        <ApolloProvider client={getApolloClient()}>
            <Provider store={getStore()}>
                <Drawer.Navigator>
                    <Drawer.Screen
                        component={Home}
                        name={Route.HOME}
                    />
                    <Drawer.Screen
                        component={FixedCategories}
                        name={Route.FIXED_CATEGORIES}
                    />
                    <Drawer.Screen
                        component={VariableCategories}
                        name={Route.VARIABLE_CATEGORIES}
                    />
                </Drawer.Navigator>
            </Provider>
        </ApolloProvider>
    </NavigationNativeContainer>;

export default App;
