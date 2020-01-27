import * as reactNavigationNative from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import {DrawerActions} from '@react-navigation/routers';

import {HamburgerMenu} from '../../../src/components/navigation/HeaderComponents';
import {FeatherNames} from '../../../src/enums/icon-names';

jest.mock('@react-navigation/native');

describe('HeaderComponents', () => {
    const {useNavigation} = reactNavigationNative as jest.Mocked<typeof reactNavigationNative>;

    describe('HamburgerMenu', () => {
        let expectedNavigation;

        beforeEach(() => {
            expectedNavigation = {
                dispatch: jest.fn()
            };

            useNavigation.mockReturnValue(expectedNavigation);
        });

        it('should render a Feather component', () => {
            // eslint-disable-next-line new-cap
            const renderedComponent = HamburgerMenu({})!;

            expect(renderedComponent.type).toEqual(Feather);
            expect(renderedComponent.props).toEqual({
                allowFontScaling: false,
                name: FeatherNames.MENU,
                onPress: expect.any(Function),
                size: 25,
                style: expect.any(Object)
            });

            renderedComponent.props.onPress();

            expect(expectedNavigation.dispatch).toHaveBeenCalledTimes(1);
            expect(expectedNavigation.dispatch).toHaveBeenCalledWith(DrawerActions.openDrawer());
        });
    });
});