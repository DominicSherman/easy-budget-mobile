import * as reactNavigationNative from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/routers';
import TestRenderer from 'react-test-renderer';
import React from 'react';
import Touchable from 'react-native-platform-touchable';

import {FeatherNames} from '../../../src/enums/IconNames';
import {CloseIcon, HamburgerMenu, InfoIcon} from '../../../src/components/navigation/HeaderComponents';
import {Route} from '../../../src/enums/Route';

jest.mock('@react-navigation/native');
jest.mock('../../../src/redux/hooks');

describe('HeaderComponents', () => {
    const {useNavigation} = reactNavigationNative as jest.Mocked<typeof reactNavigationNative>;

    let root;

    describe('HamburgerMenu', () => {
        let expectedNavigation;

        const render = (): void => {
            root = TestRenderer.create(
                <HamburgerMenu />
            ).root;
        };

        beforeEach(() => {
            expectedNavigation = {
                dispatch: jest.fn()
            };

            useNavigation.mockReturnValue(expectedNavigation);

            render();
        });

        it('should render a Feather component', () => {
            root.findByProps({name: FeatherNames.MENU});

            const renderedTouchable = root.findByType(Touchable);

            renderedTouchable.props.onPress();

            expect(expectedNavigation.dispatch).toHaveBeenCalledTimes(1);
            expect(expectedNavigation.dispatch).toHaveBeenCalledWith(DrawerActions.openDrawer());
        });
    });

    describe('CloseIcon', () => {
        let expectedNavigation;

        const render = (): void => {
            root = TestRenderer.create(
                <CloseIcon />
            ).root;
        };

        beforeEach(() => {
            expectedNavigation = {
                goBack: jest.fn()
            };

            useNavigation.mockReturnValue(expectedNavigation);

            render();
        });

        it('should render a Feather component', () => {
            root.findByProps({name: FeatherNames.X});

            const renderedTouchable = root.findByType(Touchable);

            expect(renderedTouchable.props.onPress).toBe(expectedNavigation.goBack);
        });
    });

    describe('InfoIcon', () => {
        let expectedNavigation;

        const render = (): void => {
            root = TestRenderer.create(
                <InfoIcon />
            ).root;
        };

        beforeEach(() => {
            expectedNavigation = {
                navigate: jest.fn()
            };

            useNavigation.mockReturnValue(expectedNavigation);

            render();
        });

        it('should render a Feather component', () => {
            root.findByProps({name: FeatherNames.INFO});

            const renderedTouchable = root.findByType(Touchable);

            renderedTouchable.props.onPress();

            expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
            expect(expectedNavigation.navigate).toHaveBeenCalledWith({
                name: Route.INFORMATION,
                params: undefined
            });
        });
    });
});
