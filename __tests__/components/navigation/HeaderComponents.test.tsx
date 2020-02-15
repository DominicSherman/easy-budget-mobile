import * as reactNavigationNative from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/routers';

import {CloseIcon, HamburgerMenu} from '../../../src/components/navigation/HeaderComponents';
import {FeatherNames} from '../../../src/enums/IconNames';

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
            const renderedComponent = HamburgerMenu({})!;

            expect(renderedComponent.props).toEqual({
                name: FeatherNames.MENU,
                onPress: expect.any(Function)
            });

            renderedComponent.props.onPress();

            expect(expectedNavigation.dispatch).toHaveBeenCalledTimes(1);
            expect(expectedNavigation.dispatch).toHaveBeenCalledWith(DrawerActions.openDrawer());
        });
    });

    describe('CloseIcon', () => {
        let expectedNavigation;

        beforeEach(() => {
            expectedNavigation = {
                goBack: jest.fn()
            };

            useNavigation.mockReturnValue(expectedNavigation);
        });

        it('should render a Feather component', () => {
            const renderedComponent = CloseIcon({})!;

            expect(renderedComponent.props).toEqual({
                name: FeatherNames.X,
                onPress: expectedNavigation.goBack
            });
        });
    });
});
