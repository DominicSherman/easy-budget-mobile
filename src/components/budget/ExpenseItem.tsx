import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {IExpense} from '../../../autogen/IExpense';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {RegularText, SmallText} from '../generic/Text';
import {formatExpenseDate} from '../../services/moment-service';
import CardView from '../generic/CardView';

const styles = StyleSheet.create({
    singleWrapper: {
        alignItems: 'center',
        width: SCREEN_WIDTH / 3
    },
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 8,
        width: SCREEN_WIDTH - 16
    }
});

interface IExpenseItemProps {
    categoryName?: string
    expense: IExpense
}

const ExpenseItem: FC<IExpenseItemProps> = ({expense, categoryName}) =>
    <CardView
        disabled
        style={styles.wrapper}
    >
        <View style={[styles.singleWrapper, {alignItems: 'flex-start'}]}>
            <RegularText>{categoryName}</RegularText>
            {
                expense.name ?
                    <SmallText style={{marginTop: 8}}>{expense.name}</SmallText>
                    :
                    null
            }
        </View>
        <View style={styles.singleWrapper}>
            <RegularText>{formatExpenseDate(expense.date)}</RegularText>
        </View>
        <View style={styles.singleWrapper}>
            <RegularText>{`$${expense.amount}`}</RegularText>
        </View>
    </CardView>;

export default ExpenseItem;
