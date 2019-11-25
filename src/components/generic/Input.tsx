import React, {FC} from 'react';
import {KeyboardTypeOptions, StyleSheet, TextInput, TextStyle, View} from 'react-native';

import {textStyles} from '../../styles/text-styles';
import {colors} from '../../constants/colors';
import {SCREEN_WIDTH} from '../../constants/dimensions';

import DefaultText from './DefaultText';

const styles = StyleSheet.create({
    input: {
        borderColor: colors.lightGray,
        borderRadius: 4,
        borderWidth: 1,
        height: 40,
        marginHorizontal: 16,
        width: SCREEN_WIDTH - 32,
        ...textStyles.regularDark
    },
    title: {
        ...textStyles.regularDark,
        fontWeight: '600',
        marginLeft: 16,
        marginVertical: 8
    }
});

interface IInput {
    onChange: (text: string) => void
    title: string
    value: string
    style?: TextStyle
    keyboardType?: KeyboardTypeOptions
}

const Input: FC<IInput> = ({style, title, onChange, keyboardType, value}) =>
    <View>
        <DefaultText style={styles.title}>{title}</DefaultText>
        <TextInput
            keyboardType={keyboardType}
            onChangeText={onChange}
            style={[styles.input, style]}
            value={value}
        />
    </View>;

export default Input;
