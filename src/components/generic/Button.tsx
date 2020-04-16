import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Touchable from 'react-native-platform-touchable';

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
        backgroundColor: Color.shockBlue,
        borderRadius: 12,
        justifyContent: 'center',
        padding: 16,
        width: SCREEN_WIDTH / 2
    }
});

export interface IButtonProps {
    disabled?: boolean
    loading?: boolean
    text: string
    onPress: () => void
    textStyle?: TextStyle
    wrapperStyle?: ViewStyle
}

const Button: FC<IButtonProps> = ({disabled, onPress, text, textStyle, loading, wrapperStyle}) =>
    <Touchable
        disabled={disabled || loading}
        onPress={onPress}
        style={[styles.wrapper, shadow, wrapperStyle, disabled && styles.disabled]}
    >
        {
            loading ?
                <ActivityIndicator />
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
