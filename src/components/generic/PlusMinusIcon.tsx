import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {useBackgroundColor} from '../../utils/hooks';
import {FeatherNames} from '../../enums/IconNames';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {Color} from '../../constants/color';
import {shadow} from '../../styles/shared-styles';

const styles = StyleSheet.create({
    buttonWrapper: {
        ...shadow,
        borderRadius: 400,
        borderWidth: 3,
        bottom: 96,
        left: SCREEN_WIDTH - 72,
        paddingHorizontal: 6,
        paddingVertical: 4,
        position: 'absolute'
    }
});

interface IPlusMinusIconProps {
    isOpen: boolean
    setOpen: () => void
}

const PlusMinusIcon: FC<IPlusMinusIconProps> = ({isOpen, setOpen}) => {
    const backgroundColor = Color.shockBlue;
    const themeStyles = {
        backgroundColor,
        borderColor: backgroundColor
    };

    return (
        <View style={[styles.buttonWrapper, themeStyles]}>
            <Feather
                color={useBackgroundColor()}
                name={isOpen ? FeatherNames.X : FeatherNames.PLUS}
                onPress={setOpen}
                size={28}
            />
        </View>
    );
};

export default PlusMinusIcon;
