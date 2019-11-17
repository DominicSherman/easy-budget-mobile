import React, {FC, ReactNode} from 'react';
import {TextInput, TextStyle} from 'react-native';

import {colors} from '../../constants/colors';

const styles = {
    default: {
        color: colors.darkFont,
        fontSize: 18
    }
};

interface IDefaultTextInput {
    children: ReactNode
    style?: TextStyle
}

const DefaultTextInput: FC<IDefaultTextInput> = ({style, children}) =>
    <TextInput style={[styles.default, style]}>
        {children}
    </TextInput>;

export default DefaultTextInput;
