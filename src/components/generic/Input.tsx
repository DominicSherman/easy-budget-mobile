import React, {FC} from 'react';
import {KeyboardTypeOptions, StyleSheet, TextInput, TextStyle, View} from 'react-native';

import {textStyles} from '../../styles/text-styles';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {usePrimaryColor, useTextColor} from '../../redux/hooks';

import {RegularText} from './Text';

const styles = StyleSheet.create({
    input: {
        borderRadius: 4,
        borderWidth: 1,
        height: 40,
        marginHorizontal: 16,
        padding: 8,
        width: SCREEN_WIDTH - 32,
        ...textStyles.regular
    },
    title: {
        fontWeight: '600',
        marginLeft: 16,
        marginVertical: 8
    }
});

interface IInput {
    onChange: (text: string) => void
    title: string
    value: string | null
    style?: TextStyle
    keyboardType?: KeyboardTypeOptions
}

const Input: FC<IInput> = ({style, title, onChange, keyboardType, value}) =>
    <View>
        <RegularText style={styles.title}>{title}</RegularText>
        <TextInput
            keyboardType={keyboardType}
            onChangeText={onChange}
            style={[styles.input, {borderColor: usePrimaryColor()}, useTextColor(), style]}
            value={value ? value : ''}
        />
    </View>;

export default Input;
