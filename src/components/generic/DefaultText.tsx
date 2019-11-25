import React, {FC, ReactNode} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';

import {textStyles} from '../../styles/text-styles';

interface IDefaultText {
    children: ReactNode
    style?: StyleProp<TextStyle>
}

const DefaultText: FC<IDefaultText> = ({style, children}) =>
    <Text style={[textStyles.regularDark, style]}>
        {children}
    </Text>;

export default DefaultText;
