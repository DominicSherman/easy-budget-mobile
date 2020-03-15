import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {useBackgroundColor, usePrimaryColor} from '../../utils/hooks';
import {FeatherNames} from '../../enums/IconNames';
import {SCREEN_WIDTH} from '../../constants/dimensions';

const styles = StyleSheet.create({
    buttonWrapper: {
        borderRadius: 400,
        borderWidth: 3,
        bottom: 24,
        left: SCREEN_WIDTH - 72,
        paddingHorizontal: 2,
        position: 'absolute'
    }
});

interface IPlusMinusIconProps {
    isOpen: boolean
    setOpen: () => void
}

const PlusMinusIcon: FC<IPlusMinusIconProps> = ({isOpen, setOpen}) => {
    const primaryColor = usePrimaryColor();
    const themeStyles = {
        backgroundColor: useBackgroundColor(),
        borderColor: primaryColor
    };

    return (
        <View style={[styles.buttonWrapper, themeStyles]}>
            <Feather
                color={primaryColor}
                name={isOpen ? FeatherNames.X : FeatherNames.PLUS}
                onPress={setOpen}
                size={40}
            />
        </View>
    );
};

export default PlusMinusIcon;
