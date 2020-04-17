import React, {FC} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Feather from 'react-native-vector-icons/Feather';

import {useBudgetNavigation, useDarkBlueColor, useSecondaryBackgroundColor} from '../../utils/hooks';
import {IExpense} from '../../../autogen/IExpense';
import {CARD_WIDTH, SCREEN_WIDTH} from '../../constants/dimensions';
import {FontWeight, RegularMontserratText, SmallText, TinyText} from '../generic/Text';
import {formatExpenseDate} from '../../services/moment-service';
import {Route} from '../../enums/Route';
import {Color} from '../../constants/color';
import {FeatherNames} from '../../enums/IconNames';
import {Theme} from '../../services/theme-service';
import ColoredText from '../generic/ColoredText';

const styles = StyleSheet.create({
    border: {
        backgroundColor: Color.mediumGrey,
        bottom: 0,
        height: 2,
        left: SCREEN_WIDTH / 4,
        opacity: 0.3,
        position: 'absolute',
        width: SCREEN_WIDTH / 2,
        zIndex: 1
    },
    bottomWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%'
    },
    topWrapper: {
        alignItems: 'center',
        maxWidth: '45%'
    },
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        paddingBottom: 16,
        paddingHorizontal: 16,
        paddingTop: 24,
        width: CARD_WIDTH,
        zIndex: -2
    }
});

interface IExpenseItemProps {
    categoryName: string
    isLastItem?: boolean
    expense: IExpense
}

const ExpenseItem: FC<IExpenseItemProps> = ({expense, categoryName, isLastItem}) => {
    const navigation = useBudgetNavigation();
    const onPress = (): void => {
        navigation.navigate({
            name: Route.EXPENSE,
            params: {
                expenseId: expense.expenseId
            }
        });
    };
    const borderStyles: ViewStyle = isLastItem ? {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12
    } : {};

    return (
        <Touchable onPress={onPress}>
            <View style={[styles.wrapper, borderStyles, {backgroundColor: useSecondaryBackgroundColor()}]}>
                <View style={styles.topWrapper}>
                    <ColoredText
                        style={{marginBottom: 2}}
                        text={categoryName}
                        theme={Theme.BLUE}
                    />
                    {
                        expense.name ?
                            <TinyText fontWeight={FontWeight.BOLD}>
                                {expense.name}
                            </TinyText>
                            :
                            null
                    }
                </View>
                <View style={styles.bottomWrapper}>
                    <SmallText>{formatExpenseDate(expense.date)}</SmallText>
                    <RegularMontserratText
                        color={useDarkBlueColor()}
                        fontWeight={FontWeight.BOLD}
                    >
                        {`$${expense.amount}`}
                    </RegularMontserratText>
                    <Feather
                        color={useDarkBlueColor()}
                        name={FeatherNames.MORE}
                        size={22}
                    />
                </View>
                {
                    !isLastItem &&
                        <View style={styles.border} />
                }
            </View>
        </Touchable>
    );
};

export default ExpenseItem;
