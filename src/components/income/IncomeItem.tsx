import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {IIncomeItem} from '../../../autogen/IIncomeItem';
import {LargeText, SmallText} from '../generic/Text';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import CardView from '../generic/CardView';
import {easeInTransition} from '../../services/animation-service';
import {centeredColumn} from '../../styles/shared-styles';
import EditIcon from '../generic/EditIcon';

const styles = StyleSheet.create({
    amountWrapper: {
        justifyContent: 'center',
        marginRight: 24,
        width: '45%'
    },
    rightWrapper: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        width: '55%'
    },
    titleWrapper: {
        width: '45%'
    },
    topWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    wrapper: {
        alignItems: 'flex-start',
        borderWidth: 1,
        flexDirection: 'column',
        marginHorizontal: 8,
        width: SCREEN_WIDTH - 16
    }
});

const IncomeItem: FC<{incomeItem: IIncomeItem}> = ({incomeItem}) => {
    const [expanded, setExpanded] = useState(false);
    const {name, amount} = incomeItem;
    const toggleExpanded = (): void => {
        easeInTransition();
        setExpanded(!expanded);
    };

    return (
        <CardView
            disabled
            shadow
            style={styles.wrapper}
        >
            <View style={styles.topWrapper}>
                <View style={styles.titleWrapper}>
                    <LargeText>{name}</LargeText>
                </View>
                <View style={styles.rightWrapper}>
                    <View style={[centeredColumn, styles.amountWrapper]}>
                        <LargeText>{`$${amount}`}</LargeText>
                        <SmallText>{'amount'}</SmallText>
                    </View>
                    <EditIcon
                        isOpen={expanded}
                        onPress={toggleExpanded}
                    />
                </View>
            </View>
        </CardView>
    );
};

export default IncomeItem;
