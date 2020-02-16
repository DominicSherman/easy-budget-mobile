import React from 'react';
import Chance from 'chance';
import TestRenderer from 'react-test-renderer';
import {Animated, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import * as hooks from '../../../src/redux/hooks';
import CardView from '../../../src/components/generic/CardView';
import {colors} from '../../../src/constants/colors';

const chance = new Chance();

jest.mock('react-native/Libraries/Animated/src/Animated', () => ({
    ...jest.requireActual(
        'react-native/Libraries/Animated/src/Animated'
    ),
    sequence: jest.fn(),
    timing: jest.fn()
}));
jest.mock('../../../src/redux/hooks');

describe('CardView', () => {
    const mockAnimated = Animated as jest.Mocked<typeof Animated>;
    const {useBackgroundColor} = hooks as jest.Mocked<typeof hooks>;

    let expectedProps,
        expectedBackgroundColor,
        testRenderer,
        testInstance,
        startSpy,
        expectedChildren,
        renderedComponent,
        renderedWrapperView,
        renderedChildren;

    const cacheChildren = (): void => {
        renderedWrapperView = renderedComponent.props.children;
        renderedChildren = renderedWrapperView.props.children;
    };

    const updateComponent = (): void => {
        testRenderer.update(<CardView {...expectedProps}>{expectedChildren}</CardView>);
        testInstance = testRenderer.root;
        renderedComponent = testInstance.findByType(Touchable);
        cacheChildren();
    };

    const createTestRenderer = (): void => {
        testRenderer = TestRenderer.create(<CardView {...expectedProps}>{expectedChildren}</CardView>);
        testInstance = testRenderer.root;
        renderedComponent = testInstance.findByType(Touchable);
        cacheChildren();
    };

    beforeEach(() => {
        expectedChildren = chance.n(() => chance.pickone([
            <View key={chance.natural()} />,
            <Text key={chance.natural()}>{chance.string()}</Text>
        ]), chance.d6() + 1);
        expectedProps = {
            accessibilityLabel: chance.string(),
            disableAnimation: false,
            onPress: jest.fn(),
            shadow: false,
            style: {
                [chance.string()]: chance.string()
            }
        };
        expectedBackgroundColor = chance.pickone(Object.values(colors));
        startSpy = jest.fn();
        mockAnimated.timing.mockReturnValue({
            start: startSpy,
            stop: jest.fn()
        });
        mockAnimated.sequence.mockReturnValue({
            start: startSpy,
            stop: jest.fn()
        });

        useBackgroundColor.mockReturnValue(expectedBackgroundColor);
        createTestRenderer();
    });

    afterEach(() => {
        mockAnimated.timing.mockReset();
        mockAnimated.sequence.mockReset();
    });

    it('should render the root <Touchable> component', () => {
        expect(renderedComponent.type).toBe(Touchable);
        expect(renderedComponent.props.accessibilityLabel).toBe(expectedProps.accessibilityLabel);
        expect(renderedComponent.props.accessibilityRole).toBe('button');
        expect(renderedComponent.props.onPress).toBe(expectedProps.onPress);

        renderedComponent.props.onPressIn();
        renderedComponent.props.onPressOut();

        expect(Animated.timing).toHaveBeenCalledTimes(3);
        expect(Animated.sequence).toHaveBeenCalledTimes(1);
        expect(Animated.timing).toHaveBeenCalledWith(expect.any(Animated.Value), {
            duration: 100,
            toValue: 0.9,
            useNativeDriver: true
        });
        expect(Animated.timing).toHaveBeenCalledWith(expect.any(Animated.Value), {
            duration: 100,
            toValue: 1,
            useNativeDriver: true
        });
        expect(startSpy).toHaveBeenCalledTimes(2);
    });

    it('should render the root <Touchable> component when disableAnimation is true', () => {
        expectedProps.disableAnimation = true;

        updateComponent();

        expect(renderedComponent.type).toBe(Touchable);

        renderedComponent.props.onPressIn();
        renderedComponent.props.onPressOut();

        expect(Animated.timing).not.toHaveBeenCalled();
        expect(Animated.sequence).not.toHaveBeenCalled();
        expect(startSpy).not.toHaveBeenCalled();
    });

    it('should render a wrapper view with the correct styles', () => {
        expect(renderedWrapperView.type).toBe(Animated.View);
        expect(renderedWrapperView.props.style[0]).toEqual({backgroundColor: expectedBackgroundColor});
    });

    it('should render a wrapper view with the correct styles when shadow is true', () => {
        expectedProps.shadow = true;

        updateComponent();

        expect(renderedWrapperView.props.style[4]).toEqual({
            borderColor: colors.white,
            borderWidth: 0,
            elevation: 3,
            shadowColor: colors.black,
            shadowOffset: {
                height: 2,
                width: 0
            },
            shadowOpacity: 0.3,
            shadowRadius: 2
        });
    });

    it('should render the children', () => {
        expect(renderedChildren).toEqual(expectedChildren);
    });
});
