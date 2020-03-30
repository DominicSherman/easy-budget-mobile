import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {FeatherNames} from '../../enums/IconNames';
import {usePrimaryColor} from '../../utils/hooks';

import {RegularText} from './Text';

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        flexDirection: 'column'
    }
});

export interface IToggleProps {
    checked: boolean
    color?: string
    onChange: (value: boolean) => void
    title: string
    value: boolean
}

const Toggle: FC<IToggleProps> = (props) => {
    const primaryColor = usePrimaryColor();
    const color = props.color || primaryColor;
    const {title} = props;

    return (
        <View style={styles.wrapper}>
            <Feather
                color={color}
                name={props.checked ? FeatherNames.CHECK_SQUARE : FeatherNames.SQUARE}
                size={20}
            />
            <RegularText style={{marginTop: 8}}>{title}</RegularText>
        </View>
    );
};

export default Toggle;
