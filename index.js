import {Navigation} from 'react-native-navigation';

import {loadIcons} from './src/services/icon-service';
import {getDefaultOptions, getLoggedInRootLayout, getLoggedOutRootLayout} from './src/helpers/navigation-helpers';
import {registerScreens} from './src/screens';
import {getIsSignedIn} from './src/services/auth-service';
import {initializeStore} from './src/redux/store';
import {setActiveTimePeriodData} from './src/redux/action-creators';

// eslint-disable-next-line no-console
console.disableYellowBox = true;

initializeStore();
registerScreens();

Navigation.events().registerAppLaunchedListener(async () => {
    await loadIcons();
    await Navigation.setDefaultOptions(getDefaultOptions());

    const isSignedIn = await getIsSignedIn();

    let rootLayout;

    if (isSignedIn) {
        await setActiveTimePeriodData();

        rootLayout = getLoggedInRootLayout();
    } else {
        rootLayout = getLoggedOutRootLayout();
    }

    await Navigation.setRoot(rootLayout);
});
