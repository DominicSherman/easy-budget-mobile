import React, {FC} from 'react';
import {KeyboardTypeOptions, StyleSheet, TextInput, TextStyle, View} from 'react-native';

import {textStyles} from '../../styles/text-styles';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {useMode, usePrimaryColor} from '../../utils/hooks';
import {Color} from '../../constants/color';
import {Mode} from '../../enums/Mode';

import {TinyText} from './Text';

const styles = StyleSheet.create({
    input: {
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
            color={Color.mediumGrey}
            style={styles.title}
        >
            {title}
        </TinyText>
        <TextInput
            keyboardType={keyboardType}
            onChangeText={onChange}
            style={[
                styles.input,
                {borderColor: usePrimaryColor()},
                {color: usePrimaryColor()},
                {backgroundColor: useMode() === Mode.DARK ? Color.darkInputGrey : Color.lightGrey},
                style
            ]}
            value={value ? value : ''}
        />
    </View>;

export default Input;
