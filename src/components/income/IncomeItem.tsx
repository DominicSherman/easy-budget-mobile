import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {IIncomeItem} from '../../../autogen/IIncomeItem';
import {LargeText, TinyText} from '../generic/Text';
import {CARD_MARGIN, CARD_WIDTH} from '../../constants/dimensions';
import CardView from '../generic/CardView';
import {easeInTransition} from '../../services/animation-service';
import {centeredColumn} from '../../styles/shared-styles';
import {useSecondaryTextColor} from '../../utils/hooks';
import {Color} from '../../constants/color';
import {FeatherNames} from '../../enums/IconNames';
import ColoredText from '../generic/ColoredText';
import {Theme} from '../../services/theme-service';

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
    const primaryColor = useSecondaryTextColor();
    const color = recurring ? Color.sunflower : primaryColor;
    const iconName = recurring ? FeatherNames.CHECK_SQUARE : FeatherNames.SQUARE;
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
                        <Feather
                            color={color}
                            name={iconName}
                            size={20}
                        />
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
