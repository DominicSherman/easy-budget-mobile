import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {useTimePeriod} from '../../utils/hooks';
import {TimePeriodType} from '../../redux/reducer';
import {centeredColumn} from '../../styles/shared-styles';
import {FontWeight, RegularText, SmallText} from '../generic/Text';
import {getFormattedTimePeriodText} from '../../utils/utils';
import {Color} from '../../constants/color';

const styles = StyleSheet.create({
    wrapper: {
        ...centeredColumn,
        backgroundColor: Color.lightGreen,
        padding: 16,
        width: '100%'
    }
});
const BrowsingHeader: FC = () => {
    const timePeriod = useTimePeriod();

    if (!timePeriod || timePeriod.type === TimePeriodType.ACTIVE) {
        return null;
    }

    return (
        <View style={styles.wrapper}>
            <SmallText color={Color.white}>{'You are currently browsing'}</SmallText>
            <RegularText
                color={Color.white}
                fontWeight={FontWeight.BOLD}
            >
                {getFormattedTimePeriodText(timePeriod)}
            </RegularText>
        </View>
    );
};

export default BrowsingHeader;
