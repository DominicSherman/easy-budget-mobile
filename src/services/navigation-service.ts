import {Navigation} from 'react-native-navigation';

import {Route} from '../constants/routes';

export const showModal = (route: Route, title = '', passProps = {}): void => {
    Navigation.showModal({
        stack: {
            children: [{
                component: {
                    name: route,
                    options: {
                        topBar: {
                            title: {
                                text: title
                            }
                        }
                    },
                    passProps
                }

            }]
        }
    });
};
