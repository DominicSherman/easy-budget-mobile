import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import {Color} from '../../constants/color';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {shadow} from '../../styles/shared-styles';

import {LargeText} from './Text';

const styles = StyleSheet.create({
    disabled: {
        backgroundColor: Color.lightGrey
    },
    wrapper: {
        alignItems: 'center',
        backgroundColor: Color.orange,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 16,
        width: SCREEN_WIDTH / 1.5
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
        style={[styles.wrapper, disabled && styles.disabled, shadow, wrapperStyle]}
    >
        {
            loading ?
                <ActivityIndicator />
                :
                <LargeText style={[{color: Color.white}, textStyle]}>
                    {text}
                </LargeText>
        }
    </Touchable>;

export default Button;
