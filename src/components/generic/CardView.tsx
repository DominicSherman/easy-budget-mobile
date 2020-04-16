import React, {FC, useState} from 'react';
import {Animated, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import {Color} from '../../constants/color';
import {useSecondaryBackgroundColor} from '../../utils/hooks';
import {shadow} from '../../styles/shared-styles';

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        borderColor: Color.lightGrey,
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        padding: 16,
        paddingLeft: 19,
        width: '100%'
    }
});

interface ICardViewProps {
    accessibilityLabel?: string
    disableAnimation?: boolean
    disabled?: boolean
    onPress?: () => void
    shadow?: boolean
    style?: StyleProp<ViewStyle>
    testID?: string
}

const CardView: FC<ICardViewProps> = (props) => {
    const [scale] = useState(new Animated.Value(1));
    const {
        accessibilityLabel,
        disabled,
        onPress,
        testID
    } = props;
    const color = useSecondaryBackgroundColor();
    const getShadowStyles = (): ViewStyle => props.shadow ? shadow : {};
    const getWrapperStyles = (): any => [
        {backgroundColor: color},
        styles.wrapper,
        props.style,
        {transform: [{scale}]},
        getShadowStyles()
    ];
    const animateIn = (): void | false => !props.disableAnimation && Animated.timing(scale, {
        duration: 100,
        toValue: 0.9,
        useNativeDriver: true
    }).start();
    const animateOut = (): void | false => !props.disableAnimation && Animated.sequence([
        Animated.timing(scale, {
            duration: 100,
            toValue: 1.05,
            useNativeDriver: true
        }),
        Animated.timing(scale, {
            duration: 100,
            toValue: 1,
            useNativeDriver: true
        })
    ]).start();

    return (
        <Touchable
            accessibilityLabel={accessibilityLabel}
            accessibilityRole={'button'}
            activeOpacity={1}
            background={Touchable.SelectableBackgroundBorderless()}
            disabled={disabled}
            onPress={onPress}
            onPressIn={animateIn}
            onPressOut={animateOut}
            testID={testID}
        >
            <Animated.View style={getWrapperStyles()}>
                {props.children}
            </Animated.View>
        </Touchable>
    );
};

export default CardView;
