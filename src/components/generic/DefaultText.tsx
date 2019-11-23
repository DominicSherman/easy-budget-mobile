import React, {ReactNode, FC} from 'react';
import {Text, TextStyle} from 'react-native';

import {colors} from '../../constants/colors';

const styles = {
    default: {
        color: colors.darkFont,
        fontSize: 18
    }
};

interface IDefaultText {
    children: ReactNode
    style?: TextStyle
}

const DefaultText: FC<IDefaultText> = ({style, children}) =>
    <Text style={[styles.default, style]}>
        {children}
    </Text>;

export default DefaultText;
