import {ScrollView, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Touchable from 'react-native-platform-touchable';

import {SCREEN_HEIGHT} from '../../constants/dimensions';
import {colors} from '../../constants/colors';

import {RegularText, TitleText} from './Text';

const styles = StyleSheet.create({
    emptyWrapper: {
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: SCREEN_HEIGHT * 0.1
    },
    subText: {
        color: colors.lightGrey,
        marginTop: 16
    }
});

interface IEmptyScreenProps {
    subText?: string
    onPressSubText?: () => void
    titleText: string
}

const EmptyScreen: FC<IEmptyScreenProps> = ({titleText, subText, onPressSubText}) =>
    <ScrollView contentContainerStyle={styles.emptyWrapper}>
        <TitleText>{titleText}</TitleText>
        <Touchable
            disabled={!onPressSubText}
            onPress={onPressSubText}
        >
            <RegularText style={styles.subText}>
                {subText}
            </RegularText>
        </Touchable>
    </ScrollView>;

export default EmptyScreen;
