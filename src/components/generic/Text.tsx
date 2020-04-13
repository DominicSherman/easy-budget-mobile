import React, {FC, ReactNode} from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';

import {textStyles} from '../../styles/text-styles';
import {useTextColor} from '../../utils/hooks';
import {Color} from '../../constants/color';

interface IDefaultText {
    color?: Color
    children: ReactNode
    style?: StyleProp<TextStyle>
}

export const SmallText: FC<IDefaultText> = ({style, children, color}) =>
    <Text
        style={[
            textStyles.small,
            useTextColor(),
            style,
            color && {color}
        ]}
    >
        {children}
    </Text>;

export const RegularText: FC<IDefaultText> = ({style, children, color}) =>
    <Text
        style={[
            textStyles.regular,
            useTextColor(),
            style,
            color && {color}
        ]}
    >
        {children}
    </Text>;

export const LargeText: FC<IDefaultText> = ({style, children, color}) =>
    <Text
        style={[
            textStyles.large,
            useTextColor(),
            style,
            color && {color}
        ]}
    >
        {children}
    </Text>;

export const TitleText: FC<IDefaultText> = ({style, children, color}) =>
    <Text
        style={[
            textStyles.title,
            useTextColor(),
            style,
            color && {color}
        ]}
    >
        {children}
    </Text>;
