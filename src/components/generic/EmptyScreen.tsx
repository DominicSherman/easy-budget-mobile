import {ScrollView, StyleSheet, TextStyle} from 'react-native';
import React, {FC} from 'react';
import Touchable from 'react-native-platform-touchable';

import {SCREEN_HEIGHT} from '../../constants/dimensions';

import {RegularText, TitleText} from './Text';

const styles = StyleSheet.create({
    emptyWrapper: {
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: SCREEN_HEIGHT * 0.1
    }
});

interface IEmptyScreenProps {
    subText?: string
    subTextStyle?: TextStyle
    onPressSubText?: () => void
    titleText: string
}

const EmptyScreen: FC<IEmptyScreenProps> = ({titleText, subText, subTextStyle, onPressSubText}) =>
    <ScrollView contentContainerStyle={styles.emptyWrapper}>
        <TitleText>{titleText}</TitleText>
        <Touchable
            disabled={!onPressSubText}
            onPress={onPressSubText}
        >
            <RegularText
                style={[{marginTop: 16}, subTextStyle]}
            >
                {subText}
            </RegularText>
        </Touchable>
    </ScrollView>;

export default EmptyScreen;
