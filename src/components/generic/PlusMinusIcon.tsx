import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import HapticFeedback from 'react-native-haptic-feedback';

import {FeatherNames} from '../../enums/IconNames';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {Color} from '../../constants/color';
import {shadow} from '../../styles/shared-styles';
import {getThemedSelectedColor, Theme} from '../../services/theme-service';
import {useMode} from '../../utils/hooks';

const styles = StyleSheet.create({
    buttonWrapper: {
        ...shadow,
        borderRadius: 400,
        borderWidth: 3,
        bottom: 32,
        left: SCREEN_WIDTH - 72,
        paddingHorizontal: 6,
        paddingVertical: 4,
        position: 'absolute'
    }
});

interface IPlusMinusIconProps {
    isOpen: boolean
    theme?: Theme
    setOpen: () => void
}

const PlusMinusIcon: FC<IPlusMinusIconProps> = ({isOpen, setOpen, theme}) => {
    const mode = useMode();
    const backgroundColor = theme ? getThemedSelectedColor(mode, theme) : getThemedSelectedColor(mode, Theme.BLUE);
    const themeStyles = {
        backgroundColor,
        borderColor: backgroundColor
    };

    return (
        <View style={[styles.buttonWrapper, themeStyles]}>
            <Feather
                color={Color.white}
                name={isOpen ? FeatherNames.X : FeatherNames.PLUS}
                onPress={(): void => {
                    HapticFeedback.trigger('impactLight');
                    setOpen();
                }}
                size={28}
                testID={'PlusMinusIcon'}
            />
        </View>
    );
};

export default PlusMinusIcon;
