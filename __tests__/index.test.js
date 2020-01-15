import Chance from 'chance';

jest.mock('../src/screens', () => ({registerScreens: jest.fn()}));
jest.mock('../src/services/icon-service', () => ({loadIcons: jest.fn()}));
jest.mock('../src/helpers/navigation-helpers');
jest.mock('../src/services/auth-service', () => ({
    getIsSignedIn: jest.fn()
}));
jest.mock('../src/redux/action-creators');

const chance = new Chance();

describe('index', () => {
    let Navigation,
        registerScreens,
        loadIcons,
        getDefaultOptions,
        setActiveTimePeriodData,
        navigationHelpers,
        expectedDefaultOptions,
        expectedLoggedInRoot,
        expectedLoggedOutRoot,
        getIsSignedIn,
        registerAppSpy;

    beforeEach(() => {
        Navigation = require('react-native-navigation').Navigation;
        registerScreens = require('../src/screens').registerScreens;
        loadIcons = require('../src/services/icon-service').loadIcons;
        expectedDefaultOptions = chance.string();
        navigationHelpers = require('../src/helpers/navigation-helpers');
        getDefaultOptions = navigationHelpers.getDefaultOptions;
        getDefaultOptions.mockReturnValue(expectedDefaultOptions);
        expectedLoggedInRoot = chance.string();
        expectedLoggedOutRoot = chance.string();
        setActiveTimePeriodData = require('../src/redux/action-creators').setActiveTimePeriodData;
        getIsSignedIn = require('../src/services/auth-service').getIsSignedIn;

        navigationHelpers.getLoggedInRootLayout.mockReturnValue(expectedLoggedInRoot);
        navigationHelpers.getLoggedOutRootLayout.mockReturnValue(expectedLoggedOutRoot);
        registerAppSpy = jest.fn();
        Navigation.events = jest.fn().mockReturnValue({
            registerAppLaunchedListener: registerAppSpy
        });
        Navigation.setDefaultOptions = jest.fn();
        Navigation.setRoot = jest.fn();

        require('../index');
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.resetModules();
    });

    it('should register the screens', () => {
        expect(registerScreens).toHaveBeenCalledTimes(1);
    });

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const triggerAppLaunchedListener = () => {
        const [listener] = registerAppSpy.mock.calls[0];

        return listener();
    };

    describe('registerAppLaunchedListener', () => {
        it('should register a listener for app launch', () => {
            expect(registerAppSpy).toHaveBeenCalledTimes(1);
        });

        it('should load the icons', async () => {
            await triggerAppLaunchedListener();

            expect(loadIcons).toHaveBeenCalledTimes(1);
        });

        it('should set the default options for Navigation', async () => {
            await triggerAppLaunchedListener();

            expect(getDefaultOptions).toHaveBeenCalledTimes(1);
            expect(Navigation.setDefaultOptions).toHaveBeenCalledTimes(1);
            expect(Navigation.setDefaultOptions).toHaveBeenCalledWith(expectedDefaultOptions);
        });

        describe('when the user is signed in', () => {
            beforeEach(() => {
                getIsSignedIn.mockReturnValue(true);
            });

            it('should set active time period data', async () => {
                await triggerAppLaunchedListener();

                expect(setActiveTimePeriodData).toHaveBeenCalledTimes(1);
                expect(setActiveTimePeriodData).toHaveBeenCalledWith();
            });

            it('should set the root for Navigation', async () => {
                await triggerAppLaunchedListener();

                expect(Navigation.setRoot).toHaveBeenCalledTimes(1);
                expect(Navigation.setRoot).toHaveBeenCalledWith(expectedLoggedInRoot);
            });
        });

        describe('when the user is **not**signed in', () => {
            beforeEach(() => {
                getIsSignedIn.mockReturnValue(false);
            });

            it('should **not** set active time period data', async () => {
                await triggerAppLaunchedListener();

                expect(setActiveTimePeriodData).not.toHaveBeenCalled();
            });

            it('should set the root for Navigation', async () => {
                await triggerAppLaunchedListener();

                expect(Navigation.setRoot).toHaveBeenCalledTimes(1);
                expect(Navigation.setRoot).toHaveBeenCalledWith(expectedLoggedOutRoot);
            });
        });
    });
});
