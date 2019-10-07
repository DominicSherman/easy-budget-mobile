import {Navigation} from 'react-native-navigation';
import {loadIcons} from './src/services/icons-factory';
import {getDefaultOptions} from './src/services/layout-factory';
import {registerScreens} from './src/screens';
import {getRoot} from './src/services/auth-service';

console.disableYellowBox = true;

registerScreens();

Navigation.events().registerAppLaunchedListener(async () => {
  await loadIcons();
  await Navigation.setDefaultOptions(getDefaultOptions());

  const rootLayout = await getRoot();

  await Navigation.setRoot(rootLayout);
});
