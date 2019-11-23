import Chance from 'chance';

jest.mock('../src/screens', () => ({registerScreens: jest.fn()}));
jest.mock('../src/services/icon-service', () => ({loadIcons: jest.fn()}));
jest.mock('../src/helpers/navigation-helpers', () => ({
    getDefaultOptions: jest.fn(),
    getRoot: jest.fn()
}));
jest.mock('../src/services/auth-service', () => ({getRoot: jest.fn()}));

const chance = new Chance();

describe('index', () => {
    let Navigation,
        registerScreens,
        loadIcons,
        getDefaultOptions,
        getRoot,
        expectedDefaultOptions,
        expectedRoot,
        registerAppSpy;

    beforeEach(() => {
        Navigation = require('react-native-navigation').Navigation;
        registerScreens = require('../src/screens').registerScreens;
        loadIcons = require('../src/services/icon-service').loadIcons;
        expectedDefaultOptions = chance.string();
        getDefaultOptions = require('../src/helpers/navigation-helpers').getDefaultOptions;
        getDefaultOptions.mockReturnValue(expectedDefaultOptions);
        expectedRoot = chance.string();
        getRoot = require('../src/services/auth-service').getRoot;
        getRoot.mockReturnValue(expectedRoot);

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

        it('should set the root for Navigation', async () => {
            await triggerAppLaunchedListener();

            expect(getRoot).toHaveBeenCalledTimes(1);
            expect(Navigation.setRoot).toHaveBeenCalledTimes(1);
            expect(Navigation.setRoot).toHaveBeenCalledWith(expectedRoot);
        });
    });
});
