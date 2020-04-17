import TestRenderer from 'react-test-renderer';
import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Touchable from 'react-native-platform-touchable';

import LeftSideMenu from '../../../src/components/navigation/LeftSideMenu';
import {chance} from '../../chance';
import * as hooks from '../../../src/utils/hooks';
import {Color} from '../../../src/constants/color';

jest.mock('@react-navigation/drawer', () => ({
    DrawerContentScrollView: ({children}): JSX.Element => <>{...children}</>
}));
jest.mock('../../../src/utils/hooks');

describe('LeftSideMenu', () => {
    const {useBudgetNavigation, useTheme} = hooks as jest.Mocked<typeof hooks>;

    let testRenderer,
        testInstance,
        expectedProps,
        expectedNavigation;

    const render = (): void => {
        testRenderer = TestRenderer.create(<LeftSideMenu {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        expectedProps = {
            state: {
                index: chance.natural({
                    max: 8,
                    min: 0
                })
            }
        };
        expectedNavigation = {
            dispatch: jest.fn(),
            navigate: jest.fn()
        };

        useTheme.mockReturnValue({
            backgroundColor: chance.pickone(Object.values(Color)),
            textColor: chance.pickone(Object.values(Color))
        });
        useBudgetNavigation.mockReturnValue(expectedNavigation);

        render();
    });

    it('should render a DrawerContentScrollView', () => {
        testInstance.findByType(DrawerContentScrollView);
    });

    it('should render touchables that navigate and dispatch', () => {
        const renderedTouchables = testInstance.findAllByType(Touchable);

        // @ts-ignore
        chance.pickone(renderedTouchables).props.onPress();

        expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(expectedNavigation.dispatch).toHaveBeenCalledTimes(1);
    });
});
