import React, {FC, ReactNode} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';

import {textStyles} from '../../styles/text-styles';

interface IDefaultText {
    children: ReactNode
    style?: StyleProp<TextStyle>
}

export const SmallText: FC<IDefaultText> = ({style, children}) =>
    <Text style={[textStyles.small, style]}>
        {children}
    </Text>;

export const RegularText: FC<IDefaultText> = ({style, children}) =>
    <Text style={[textStyles.regular, style]}>
        {children}
    </Text>;

export const LargeText: FC<IDefaultText> = ({style, children}) =>
    <Text style={[textStyles.large, style]}>
        {children}
    </Text>;

export const TitleText: FC<IDefaultText> = ({style, children}) =>
    <Text style={[textStyles.title, style]}>
        {children}
    </Text>;
