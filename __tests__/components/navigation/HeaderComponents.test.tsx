import {DrawerActions} from '@react-navigation/routers';
import TestRenderer from 'react-test-renderer';
import React from 'react';
import Touchable from 'react-native-platform-touchable';

import {FeatherNames} from '../../../src/enums/IconNames';
import {BackButton, CloseIcon, HamburgerMenu, InfoIcon} from '../../../src/components/navigation/HeaderComponents';
import {Route} from '../../../src/enums/Route';
import * as hooks from '../../../src/utils/hooks';

jest.mock('react-native-haptic-feedback');
jest.mock('@react-navigation/native');
jest.mock('../../../src/utils/hooks');

describe('HeaderComponents', () => {
    const {useBudgetNavigation} = hooks as jest.Mocked<typeof hooks>;

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

            useBudgetNavigation.mockReturnValue(expectedNavigation);

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

            useBudgetNavigation.mockReturnValue(expectedNavigation);

            render();
        });

        it('should render a Feather component', () => {
            root.findByProps({name: FeatherNames.X});

            const renderedTouchable = root.findByType(Touchable);

            renderedTouchable.props.onPress();

            expect(expectedNavigation.goBack).toHaveBeenCalledTimes(1);
        });
    });

    describe('BackButton', () => {
        let expectedNavigation;

        const render = (): void => {
            root = TestRenderer.create(
                <BackButton />
            ).root;
        };

        beforeEach(() => {
            expectedNavigation = {
                goBack: jest.fn()
            };

            useBudgetNavigation.mockReturnValue(expectedNavigation);

            render();
        });

        it('should render a Feather component', () => {
            root.findByProps({name: FeatherNames.CHEVRON_LEFT});

            const renderedTouchable = root.findByType(Touchable);

            renderedTouchable.props.onPress();

            expect(expectedNavigation.goBack).toHaveBeenCalledTimes(1);
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

            useBudgetNavigation.mockReturnValue(expectedNavigation);

            render();
        });

        it('should render a Feather component', () => {
            root.findByProps({name: FeatherNames.INFO});

            const renderedTouchable = root.findByType(Touchable);

            renderedTouchable.props.onPress();

            expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
            expect(expectedNavigation.navigate).toHaveBeenCalledWith({
                name: Route.INFORMATION,
                params: {}
            });
        });
    });
});
