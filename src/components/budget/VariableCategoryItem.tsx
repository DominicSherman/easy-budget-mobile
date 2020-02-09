import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {IVariableCategory} from '../../../autogen/IVariableCategory';
import CardView from '../generic/CardView';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {RegularText, SmallText, TitleText} from '../generic/Text';
import {IExpense} from '../../../autogen/IExpense';

const styles = StyleSheet.create({
    titleWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 8,
        width: '80%'
    },
    wrapper: {
        flexDirection: 'column',
        marginHorizontal: 8,
        width: SCREEN_WIDTH - 16
    }
});

interface IVariableCategoryItemProps {
    expenses: IExpense[]
    variableCategory: IVariableCategory
}

const calculateTotal = (expenses: IExpense[]): number => expenses.reduce((total, expense) => total + expense.amount, 0);

const VariableCategoryItem: FC<IVariableCategoryItemProps> = ({expenses, variableCategory}) => {
    const categoryExpenses = expenses.filter((expense) => expense.variableCategoryId === variableCategory.variableCategoryId);
    const sum = calculateTotal(categoryExpenses);

    return (
        <CardView style={styles.wrapper}>
            <View style={styles.titleWrapper}>
                <TitleText>{variableCategory.name}</TitleText>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 8,
                    width: '80%'
                }}
            >
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <RegularText>{variableCategory.amount}</RegularText>
                    <SmallText>{'budgeted'}</SmallText>
                </View>
                <RegularText>{'-'}</RegularText>
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <RegularText>{sum}</RegularText>
                    <SmallText>{'spent'}</SmallText>
                </View>
                <RegularText>{'='}</RegularText>
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <RegularText>{variableCategory.amount - sum}</RegularText>
                    <SmallText>{'remaining'}</SmallText>
                </View>
            </View>
        </CardView>
    );
};

export default VariableCategoryItem;
