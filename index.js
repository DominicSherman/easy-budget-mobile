import {Navigation} from 'react-native-navigation';
import {loadIcons} from './src/services/icons-factory';
import {getDefaultOptions, getRoot} from './src/services/layout-factory';
import {registerScreens} from './src/screens';

console.disableYellowBox = true;

registerScreens();

Navigation.events().registerAppLaunchedListener(async () => {
  await loadIcons();
  await Navigation.setDefaultOptions(getDefaultOptions());
  await Navigation.setRoot(getRoot());
});
