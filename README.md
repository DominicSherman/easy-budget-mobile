# easy-budget-mobile

A simple budgeting app

## Getting Started

* Go through the [React Native instructions](https://facebook.github.io/react-native/docs/getting-started) for `React Native CLI` to install the necessary applications and tools
* Go to the Firebase project's setting and download the `GoogleService-Info.plist` file and put it in the `iOS` directory, and download the `google-services.json` file and put it in the `android/app` directory
    * If the `GoogleService-Info.plist` is not appearing in XCode, you may have to add it
    * If you are having issues with Android, you can try reading [this](https://github.com/react-native-community/react-native-google-signin/blob/master/docs/android-guide.md) to debug.
* Run `yarn`
* For iOS, run `pod install`
* You should be able to build by running `yarn ios` or `yarn android`
    * You can also run iOS by opening the `ios/EasyBudget.xcworkspace` file in XCode and running `build`
