import React, {FC} from 'react';
import {KeyboardTypeOptions, StyleSheet, TextInput, TextStyle, View} from 'react-native';

import {textStyles} from '../../styles/text-styles';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {usePrimaryColor, useTextColor} from '../../utils/hooks';
import {Color} from '../../constants/color';

import {TinyText} from './Text';

const styles = StyleSheet.create({
    input: {
        backgroundColor: Color.lightGrey,
        borderRadius: 6,
        height: 40,
        marginHorizontal: 16,
        padding: 8,
        width: SCREEN_WIDTH - 64,
        ...textStyles.regular
    },
    title: {
        fontWeight: '600',
        marginLeft: 16,
        marginVertical: 8
    }
});

export interface IInputProps {
    onChange: (text: string) => void
    title: string
    value: string | null
    style?: TextStyle
    keyboardType?: KeyboardTypeOptions
}

const Input: FC<IInputProps> = ({style, title, onChange, keyboardType, value}) =>
    <View>
        <TinyText
            color={Color.faintGrey}
            style={styles.title}
        >
            {title}
        </TinyText>
        <TextInput
            keyboardType={keyboardType}
            onChangeText={onChange}
            style={[styles.input, {borderColor: usePrimaryColor()}, useTextColor(), style]}
            value={value ? value : ''}
        />
    </View>;

export default Input;
