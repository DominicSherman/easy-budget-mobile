import React, {useEffect} from 'react';
import {LayoutChangeEvent, ScrollView, StyleSheet, View} from 'react-native';

import {RegularText, TitleText} from '../components/generic/Text';
import {IScreenFC} from '../types/global';
import {Route} from '../enums/Route';
import {SCREEN_HEIGHT} from '../constants/dimensions';
import {informationScrollRef} from '../utils/refs';

const styles = StyleSheet.create({
    scrollWrapper: {
        padding: 16,
        paddingBottom: SCREEN_HEIGHT * 0.8
    },
    subText: {
        marginTop: 16
    },
    wrapper: {
        marginVertical: 32
    }
});

const information = {
    expense: 'An expense is used to track how much you have spent within a variable category. Each expense is tied to a variable category, and the total of all the expenses within that category is the total spent for this time period for that category. An example of this would be a trip to the grocery store where you spent $50 would be added under your "Food" category.',
    fixed: 'A fixed category is used for expenses that do not change from month to month. For example, rent, phone bills, or insurance payments. These will simply be marked as "paid" or "unpaid".',
    income: 'Income is used to track your income per time period. Each income item can be marked as recurring, meaning it occurs every time period.',
    saving: 'A saving category is used to track savings for a specific category. For example, an emergency fund or vacation. It will keep a running total of the amount you have saved in that category, and it not tied to a time period at all.',
    timePeriod: 'A time period is the unit of time you use to track your budget. The most common is from the 1st of the month to the last of the month, but you have the flexibility to define this to be whatever you want. Once your time period ends, all of your expenses for that time period will be cleared out and all your fixed categories will go back to being "unpaid".',
    variable: 'A variable category is used for categories where you have control over how much you spend. Some examples of these are food, clothes, and entertainment. When you log expenses, you will have to choose one of these variable categories to put that expense into. The app will track how much money you have remaining in that category by subtracting the total of your expenses in it from the amount you budgeted for it.'
};

export enum InformationRef {
    EXPENSE = 'expense',
    FIXED = 'fixed',
    INCOME = 'income',
    SAVING = 'saving',
    TIME_PERIOD = 'timePeriod',
    VARIABLE = 'variable'
}

export interface IInformationProps {
    ref?: InformationRef
}

const Information: IScreenFC<Route.INFORMATION> = ({route: {params: {ref}}}) => {
    const values = {
        [InformationRef.EXPENSE]: 0,
        [InformationRef.FIXED]: 0,
        [InformationRef.INCOME]: 0,
        [InformationRef.SAVING]: 0,
        [InformationRef.TIME_PERIOD]: 0,
        [InformationRef.VARIABLE]: 0
    };

    useEffect(() => {
        setTimeout(() => {
            if (ref && informationScrollRef.current) {
                informationScrollRef.current.scrollTo({
                    animated: true,
                    x: 0,
                    y: values[ref] - 16
                });
            }
        }, 1000);
    }, [ref, values]);

    return (
        <ScrollView
            contentContainerStyle={styles.scrollWrapper}
            ref={informationScrollRef}
        >
            <View
                onLayout={(event: LayoutChangeEvent): void => {
                    values[InformationRef.TIME_PERIOD] = event.nativeEvent.layout.y;
                }}
                style={styles.wrapper}
                testID={'TimePeriodView'}
            >
                <TitleText>{'Time Period'}</TitleText>
                <RegularText style={styles.subText}>{information.timePeriod}</RegularText>
            </View>
            <View
                onLayout={(event: LayoutChangeEvent): void => {
                    values[InformationRef.FIXED] = event.nativeEvent.layout.y;
                }}
                style={styles.wrapper}
                testID={'FixedCategoryView'}
            >
                <TitleText>{'Fixed Category'}</TitleText>
                <RegularText style={styles.subText}>{information.fixed}</RegularText>
            </View>
            <View
                onLayout={(event: LayoutChangeEvent): void => {
                    values[InformationRef.VARIABLE] = event.nativeEvent.layout.y;
                }}
                style={styles.wrapper}
                testID={'VariableCategoryView'}
            >
                <TitleText>{'Variable Category'}</TitleText>
                <RegularText style={styles.subText}>{information.variable}</RegularText>
            </View>
            <View
                onLayout={(event: LayoutChangeEvent): void => {
                    values[InformationRef.EXPENSE] = event.nativeEvent.layout.y;
                }}
                style={styles.wrapper}
                testID={'ExpenseView'}
            >
                <TitleText>{'Expense'}</TitleText>
                <RegularText style={styles.subText}>{information.expense}</RegularText>
            </View>
            <View
                onLayout={(event: LayoutChangeEvent): void => {
                    values[InformationRef.SAVING] = event.nativeEvent.layout.y;
                }}
                style={styles.wrapper}
                testID={'SavingView'}
            >
                <TitleText>{'Saving Category'}</TitleText>
                <RegularText style={styles.subText}>{information.saving}</RegularText>
            </View>
            <View
                onLayout={(event: LayoutChangeEvent): void => {
                    values[InformationRef.INCOME] = event.nativeEvent.layout.y;
                }}
                style={styles.wrapper}
                testID={'IncomeView'}
            >
                <TitleText>{'Income'}</TitleText>
                <RegularText style={styles.subText}>{information.income}</RegularText>
            </View>
        </ScrollView>
    );
};

export default Information;
