import React, {FC} from 'react';
import {View, ViewStyle} from 'react-native';

import {Theme} from '../../services/theme-service';
import {useTheme} from '../../utils/hooks';
import {textWrapperRounded} from '../../styles/shared-styles';

import {FontWeight, RegularMontserratText} from './Text';

interface IColoredTextProps {
    theme: Theme
    text: string
    style?: ViewStyle
}

const ColoredText: FC<IColoredTextProps> = ({theme, text, style}) => {
    const {backgroundColor, textColor} = useTheme(theme);

    return (
        <View style={[textWrapperRounded, {backgroundColor}, style]}>
            <RegularMontserratText
                color={textColor}
                fontWeight={FontWeight.BOLD}
            >
                {text}
            </RegularMontserratText>
        </View>
    );
};

export default ColoredText;
