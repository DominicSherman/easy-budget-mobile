import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Touchable from 'react-native-platform-touchable';

import {FeatherNames} from '../../enums/IconNames';
import {usePrimaryColor} from '../../utils/hooks';
import {Color} from '../../constants/color';

import {RegularText} from './Text';

const styles = StyleSheet.create({
    text: {
        fontWeight: '600',
        marginTop: 4
    },
    wrapper: {
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 16
    }
});

export interface IToggleProps {
    checked: boolean
    color?: string
    onChange: (value: boolean) => void
    title: string
}

const Toggle: FC<IToggleProps> = (props) => {
    const primaryColor = usePrimaryColor();
    const unselectedColor = props.color || primaryColor;
    const {checked, onChange, title} = props;
    const color = checked ? Color.orange : unselectedColor;
    const onPress = (): void => onChange(!checked);

    return (
        <Touchable onPress={onPress}>
            <View style={styles.wrapper}>
                <Feather
                    color={color}
                    name={checked ? FeatherNames.CHECK_SQUARE : FeatherNames.SQUARE}
                    size={28}
                />
                <RegularText style={styles.text}>{title}</RegularText>
            </View>
        </Touchable>
    );
};

export default Toggle;
