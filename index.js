import {Navigation} from 'react-native-navigation';

import {loadIcons} from './src/services/icon-service';
import {getDefaultOptions} from './src/helpers/navigation-helpers';
import {registerScreens} from './src/screens';
import {getRoot} from './src/services/auth-service';

// eslint-disable-next-line no-console
console.disableYellowBox = true;

registerScreens();

Navigation.events().registerAppLaunchedListener(async () => {
    await loadIcons();
    await Navigation.setDefaultOptions(getDefaultOptions());

    const rootLayout = await getRoot();

    await Navigation.setRoot(rootLayout);
});
