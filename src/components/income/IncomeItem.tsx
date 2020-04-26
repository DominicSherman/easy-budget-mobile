import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {IIncomeItem} from '../../../autogen/IIncomeItem';
import {LargeText, TinyText} from '../generic/Text';
import {CARD_MARGIN, CARD_WIDTH} from '../../constants/dimensions';
import CardView from '../generic/CardView';
import {easeInTransition} from '../../services/animation-service';
import {centeredColumn} from '../../styles/shared-styles';
import ColoredText from '../generic/ColoredText';
import {Theme} from '../../services/theme-service';
import RecurringIcon from '../generic/RecurringIcon';

import EditIncomeItemForm from './EditIncomeItemForm';

const styles = StyleSheet.create({
    amountWrapper: {
        justifyContent: 'center',
        marginRight: 32
    },
    recurringWrapper: {
        marginRight: 8
    },
    rightWrapper: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    titleWrapper: {
        maxWidth: '50%'
    },
    topWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    wrapper: {
        alignItems: 'flex-start',
        borderWidth: 1,
        flexDirection: 'column',
        marginHorizontal: CARD_MARGIN,
        width: CARD_WIDTH
    }
});

const IncomeItem: FC<{ incomeItem: IIncomeItem }> = ({incomeItem}) => {
    const [expanded, setExpanded] = useState(false);
    const {name, amount, recurring} = incomeItem;
    const toggleExpanded = (): void => {
        easeInTransition();
        setExpanded(!expanded);
    };

    return (
        <CardView
            onPress={toggleExpanded}
            shadow
            style={styles.wrapper}
        >
            <View style={styles.topWrapper}>
                <View style={styles.titleWrapper}>
                    <ColoredText
                        text={name}
                        theme={Theme.GOLD}
                    />
                </View>
                <View style={styles.rightWrapper}>
                    <View style={[centeredColumn, styles.amountWrapper]}>
                        <LargeText>{`$${amount}`}</LargeText>
                        <TinyText>{'amount'}</TinyText>
                    </View>
                    <View style={[centeredColumn, styles.recurringWrapper]}>
                        <RecurringIcon isRecurring={recurring} />
                        <TinyText>{'recurring'}</TinyText>
                    </View>
                </View>
            </View>
            {
                expanded &&
                    <EditIncomeItemForm
                        incomeItem={incomeItem}
                        toggleExpanded={toggleExpanded}
                    />
            }
        </CardView>
    );
};

export default IncomeItem;
