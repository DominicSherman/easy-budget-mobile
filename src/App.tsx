import React, {FC} from 'react';
import {NavigationNativeContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Route} from './constants/routes';
import Home from './screens/Home';
import FixedCategories from './screens/FixedCategories';
import VariableCategories from './screens/VariableCategories';

const Drawer = createDrawerNavigator();

const App: FC = () =>
    <NavigationNativeContainer>
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
    </NavigationNativeContainer>;

export default App;
