import React, {FC, ReactNode} from 'react';
import {Text, TextStyle} from 'react-native';

import {textStyles} from '../../styles/text-styles';

interface IDefaultText {
    children: ReactNode
    style?: TextStyle
}

const DefaultText: FC<IDefaultText> = ({style, children}) =>
    <Text style={[textStyles.regularDark, style]}>
        {children}
    </Text>;

export default DefaultText;
