import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import {TinyText} from './Text';
import RecurringIcon from './RecurringIcon';

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

export interface IRecurringToggleProps {
    checked: boolean
    color?: string
    onChange: (value: boolean) => void
    title: string
}

const RecurringToggle: FC<IRecurringToggleProps> = (props) => {
    const {checked, onChange, title} = props;
    const onPress = (): void => onChange(!checked);

    return (
        <Touchable onPress={onPress}>
            <View style={styles.wrapper}>
                <RecurringIcon isRecurring={checked} />
                <TinyText style={styles.text}>{title}</TinyText>
            </View>
        </Touchable>
    );
};

export default RecurringToggle;
