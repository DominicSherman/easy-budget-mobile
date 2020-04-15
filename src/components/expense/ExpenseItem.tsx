import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {useBudgetNavigation} from '../../utils/hooks';
import {IExpense} from '../../../autogen/IExpense';
import {CARD_WIDTH, SCREEN_WIDTH} from '../../constants/dimensions';
import {RegularText, SmallText} from '../generic/Text';
import {formatExpenseDate} from '../../services/moment-service';
import CardView from '../generic/CardView';
import {Route} from '../../enums/Route';
import Touchable from 'react-native-platform-touchable';
import {Color} from '../../constants/color';

const styles = StyleSheet.create({
    singleWrapper: {
        alignItems: 'center'
    },
    wrapper: {
        alignItems: 'center',
        backgroundColor: Color.white,
        borderRadius: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        paddingBottom: 8,
        paddingHorizontal: 32,
        paddingTop: 32,
        width: CARD_WIDTH,
        zIndex: -100
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
        <Touchable onPress={onPress}>
            <View style={styles.wrapper}>
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
            </View>
        </Touchable>
    );
};

export default ExpenseItem;
