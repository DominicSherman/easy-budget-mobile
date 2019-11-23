import * as Feather from 'react-native-vector-icons/Feather';
import * as EvilIcons from 'react-native-vector-icons/EvilIcons';

jest.mock('react-native-vector-icons/Feather', () => ({
    getImageSource: jest.fn()
}));
jest.mock('react-native-vector-icons/EvilIcons', () => ({
    getImageSource: jest.fn()
}));

describe('icons service', () => {
    let iconsFactory;

    beforeEach(() => {
        iconsFactory = require('../../src/services/icon-service');
    });

    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    describe('loadIcons', () => {
        it('should load all icons', async () => {
            await iconsFactory.loadIcons();

            // @ts-ignore
            expect(Feather.getImageSource).toHaveBeenCalledTimes(3);
            // @ts-ignore
            expect(EvilIcons.getImageSource).toHaveBeenCalledTimes(1);
        });
    });

    describe('getIcons', () => {
        it('should return default icons if the others have not been loaded', () => {
            const actualIcons = iconsFactory.getIcons();

            expect(actualIcons).toEqual({
                home: undefined,
                image: undefined,
                info: undefined,
                more: undefined
            });
        });
    });
});
