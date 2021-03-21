import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import HapticFeedback from 'react-native-haptic-feedback';

import {Color} from '../../constants/color';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {shadow} from '../../styles/shared-styles';

import {FontWeight, RegularMontserratText} from './Text';

const styles = StyleSheet.create({
    disabled: {
        backgroundColor: Color.disabledGrey
    },
    wrapper: {
        alignItems: 'center',
        borderRadius: 12,
        justifyContent: 'center',
        padding: 16,
        width: SCREEN_WIDTH / 2
    }
});

export interface IButtonProps {
    color?: Color
    disabled?: boolean
    loading?: boolean
    text: string
    onPress: () => void
    textStyle?: TextStyle
    testID?: string
    wrapperStyle?: ViewStyle
}

const Button: FC<IButtonProps> = ({color, disabled, onPress, text, textStyle, loading, testID, wrapperStyle}) =>
    <Touchable
        disabled={disabled || loading}
        onPress={(): void => {
            HapticFeedback.trigger('impactLight');
            onPress();
        }}
        style={[{backgroundColor: color || Color.shockBlue}, styles.wrapper, shadow, wrapperStyle, disabled && styles.disabled]}
        testID={testID}
    >
        {
            loading ?
                <ActivityIndicator color={Color.white} />
                :
                <RegularMontserratText
                    color={Color.white}
                    fontWeight={FontWeight.BOLD}
                    style={textStyle}
                >
                    {text}
                </RegularMontserratText>
        }
    </Touchable>;

export default Button;
