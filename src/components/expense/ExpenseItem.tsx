import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {useBudgetNavigation} from '../../utils/hooks';
import {IExpense} from '../../../autogen/IExpense';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {RegularText, SmallText} from '../generic/Text';
import {formatExpenseDate} from '../../services/moment-service';
import CardView from '../generic/CardView';
import {Route} from '../../enums/Route';

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

const ExpenseItem: FC<IExpenseItemProps> = ({expense, categoryName}) => {
    const navigation = useBudgetNavigation();
    const onPress = (): void => {
        navigation.navigate({
            name: Route.EXPENSE,
            params: {
                expenseId: expense.expenseId
            }
        });
    };

    return (
        <CardView
            onPress={onPress}
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
        </CardView>
    );
};

export default ExpenseItem;
