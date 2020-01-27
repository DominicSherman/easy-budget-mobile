import React, {FC} from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import {colors} from '../../constants/colors';
import {textStyles} from '../../styles/text-styles';
import {SCREEN_WIDTH} from '../../constants/dimensions';

import DefaultText from './DefaultText';

const styles = StyleSheet.create({
    text: {
        ...textStyles.large,
        color: colors.green
    },
    wrapper: {
        alignItems: 'center',
        borderColor: colors.green,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        padding: 16,
        width: SCREEN_WIDTH / 1.5
    }
});

interface IButton {
    disabled?: boolean
    text: string
    onPress: () => void
    textStyle?: TextStyle
    wrapperStyle?: ViewStyle
}

const Button: FC<IButton> = ({disabled, onPress, text, textStyle, wrapperStyle}) =>
    <Touchable
        disabled={disabled}
        onPress={onPress}
        style={[styles.wrapper, wrapperStyle]}
    >
        <DefaultText style={[styles.text, textStyle]}>{text}</DefaultText>
    </Touchable>;

export default Button;
