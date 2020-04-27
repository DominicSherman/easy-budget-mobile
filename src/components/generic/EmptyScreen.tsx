import {Image, ScrollView, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Touchable from 'react-native-platform-touchable';

import {SCREEN_HEIGHT} from '../../constants/dimensions';
import {Color} from '../../constants/color';

import {RegularText, TitleText} from './Text';

const styles = StyleSheet.create({
    emptyWrapper: {
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: SCREEN_HEIGHT * 0.1
    },
    subText: {
        color: Color.lightGrey,
        marginTop: 16
    }
});

interface IEmptyScreenProps {
    onPressSubText?: () => void
    subText?: string
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
        <Image
            resizeMode={'contain'}
            source={require('../../../assets/empty-state-robot-large.png')}
            style={{
                height: SCREEN_HEIGHT / 2,
                width: '100%'
            }}
        />
    </ScrollView>;

export default EmptyScreen;
