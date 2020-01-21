import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import React from 'react';

// eslint-disable-next-line import/extensions
import {name as appName} from './app.json';
import App from './src/App';
import {getStore} from './src/redux/store';

// eslint-disable-next-line no-console
console.disableYellowBox = true;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Main = () =>
    <Provider store={getStore()}>
        <App />
    </Provider>;

AppRegistry.registerComponent(appName, () => Main);
