import React, {FC} from 'react';
import {StyleProp, Text, TextProps, TextStyle} from 'react-native';

import {textStyles} from '../../styles/text-styles';
import {useDarkBlueColor, usePrimaryColor, useSecondaryTextColor} from '../../utils/hooks';
import {Color} from '../../constants/color';

const DEFAULT_FONT_MULTIPLIER = 1.5;

export enum FontWeight {
    REGULAR = 'regular',
    MEDIUM = 'medium',
    BOLD = 'bold',
    EXTRA_BOLD = 'extraBold'
}

interface ITextProps extends TextProps {
    color?: Color
    fontWeight?: FontWeight
    style?: StyleProp<TextStyle>
}

const getFontWeightSettings = (weight?: FontWeight, defaultWeight = FontWeight.REGULAR): object => {
    const weightToStyles = {
        [FontWeight.REGULAR]: {fontWeight: '400'},
        [FontWeight.MEDIUM]: {fontWeight: '500'},
        [FontWeight.BOLD]: {fontWeight: '600'},
        [FontWeight.EXTRA_BOLD]: {fontWeight: '700'}
    };

    if (weight) {
        return weightToStyles[weight];
    }

    return weightToStyles[defaultWeight];
};

const getStyles = (style): TextStyle => {
    if (Array.isArray(style)) {
        let styles = {};

        style.forEach((s) => {
            styles = {
                ...styles,
                ...s
            };
        });

        return styles;
    }

    return style;
};

export const TinyText: FC<ITextProps> = ({style, color, ...props}) =>
    <Text
        maxFontSizeMultiplier={DEFAULT_FONT_MULTIPLIER}
        style={{
            ...textStyles.tiny,
            ...getFontWeightSettings(props.fontWeight),
            ...{color: useSecondaryTextColor()},
            ...color && {color},
            ...getStyles(style)
        }}
        {...props}
    >
        {props.children}
    </Text>;

export const SmallText: FC<ITextProps> = ({style, color, ...props}) =>
    <Text
        maxFontSizeMultiplier={DEFAULT_FONT_MULTIPLIER}
        style={{
            ...textStyles.small,
            ...getFontWeightSettings(props.fontWeight),
            ...{color: usePrimaryColor()},
            ...color && {color},
            ...getStyles(style)
        }}
        {...props}
    >
        {props.children}
    </Text>;

export const RegularText: FC<ITextProps> = ({style, color, ...props}) =>
    <Text
        maxFontSizeMultiplier={DEFAULT_FONT_MULTIPLIER}
        style={{
            ...textStyles.regular,
            ...getFontWeightSettings(props.fontWeight),
            ...{color: usePrimaryColor()},
            ...color && {color},
            ...getStyles(style)
        }}
        {...props}
    >
        {props.children}
    </Text>;

export const RegularMontserratText: FC<ITextProps> = ({style, color, ...props}) =>
    <Text
        maxFontSizeMultiplier={DEFAULT_FONT_MULTIPLIER}
        style={{
            ...textStyles.regularMontserrat,
            ...getFontWeightSettings(props.fontWeight),
            ...{color: usePrimaryColor()},
            ...color && {color},
            ...getStyles(style)
        }}
        {...props}
    >
        {props.children}
    </Text>;

export const LargeText: FC<ITextProps> = ({style, color, ...props}) =>
    <Text
        maxFontSizeMultiplier={DEFAULT_FONT_MULTIPLIER}
        style={{
            ...textStyles.large,
            ...getFontWeightSettings(props.fontWeight, FontWeight.EXTRA_BOLD),
            ...{color: useDarkBlueColor()},
            ...color && {color},
            ...getStyles(style)
        }}
        {...props}
    >
        {props.children}
    </Text>;

export const TitleText: FC<ITextProps> = ({style, color, ...props}) =>
    <Text
        maxFontSizeMultiplier={DEFAULT_FONT_MULTIPLIER}
        style={{
            ...textStyles.title,
            ...getFontWeightSettings(props.fontWeight, FontWeight.EXTRA_BOLD),
            ...{color: useDarkBlueColor()},
            ...color && {color},
            ...getStyles(style)
        }}
        {...props}
    >
        {props.children}
    </Text>;
