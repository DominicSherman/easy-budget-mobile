import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {IExpense} from '../../../autogen/IExpense';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {RegularText, SmallText} from '../generic/Text';
import {formatExpenseDate} from '../../services/moment-service';
import {IVariableCategory} from '../../../autogen/IVariableCategory';
import CardView from '../generic/CardView';

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 8,
        width: SCREEN_WIDTH - 16
    }
});

interface IExpenseItemProps {
    expense: IExpense
    variableCategories: IVariableCategory[]
}

const ExpenseItem: FC<IExpenseItemProps> = ({expense, variableCategories}) => {
    const getCategoryName = (variableCategoryId: string): string | undefined => variableCategories.find(
        (variableCategory) => variableCategory.variableCategoryId === variableCategoryId
    )?.name;

    return (
        <CardView
            disabled
            style={styles.wrapper}
        >
            <View style={{width: SCREEN_WIDTH / 2}}>
                <RegularText>{getCategoryName(expense.variableCategoryId)}</RegularText>
                {
                    expense.name ?
                        <SmallText style={{marginTop: 8}}>{expense.name}</SmallText>
                        :
                        null
                }
            </View>
            <View style={{width: SCREEN_WIDTH / 4}}>
                <RegularText>{formatExpenseDate(expense.date)}</RegularText>
            </View>
            <View style={{width: SCREEN_WIDTH / 4}}>
                <RegularText>{expense.amount.toFixed(2)}</RegularText>
            </View>
        </CardView>
    );
};

export default ExpenseItem;