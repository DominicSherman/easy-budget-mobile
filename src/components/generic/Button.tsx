import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import {colors} from '../../constants/colors';
import {SCREEN_WIDTH} from '../../constants/dimensions';

import {LargeText} from './Text';

const styles = StyleSheet.create({
    disabled: {
    },
    wrapper: {
        alignItems: 'center',
        backgroundColor: colors.orange,
        borderColor: colors.orange,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        padding: 16,
        width: SCREEN_WIDTH / 1.5
    }
});

interface IButton {
    disabled?: boolean
    loading?: boolean
    text: string
    onPress: () => void
    textStyle?: TextStyle
    wrapperStyle?: ViewStyle
}

const Button: FC<IButton> = ({disabled, onPress, text, textStyle, loading, wrapperStyle}) =>
    <Touchable
        disabled={disabled || loading}
        onPress={onPress}
        style={[styles.wrapper, disabled && styles.disabled, wrapperStyle]}
    >
        {
            loading ?
                <ActivityIndicator />
                :
                <LargeText style={textStyle}>
                    {text}
                </LargeText>
        }
    </Touchable>;

export default Button;
