import React, {useEffect} from 'react';
import {LayoutChangeEvent, ScrollView, StyleSheet, View} from 'react-native';

import {RegularText, TitleText} from '../components/generic/Text';
import {IScreenFC} from '../types/global';
import {Route} from '../enums/Route';
import {SCREEN_HEIGHT} from '../constants/dimensions';

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
    expense: 'A variable category is used for categories where you have control over how much you spend. Some examples of these are food, clothes, and entertainment. When you log expenses, you will have to choose one of these variable categories to put that expense into. The app will track how much money you have remaining in that category by subtracting the total of your expenses in it from the amount you budgeted for it.',
    fixed: 'A variable category is used for categories where you have control over how much you spend. Some examples of these are food, clothes, and entertainment. When you log expenses, you will have to choose one of these variable categories to put that expense into. The app will track how much money you have remaining in that category by subtracting the total of your expenses in it from the amount you budgeted for it.',
    timePeriod: 'A variable category is used for categories where you have control over how much you spend. Some examples of these are food, clothes, and entertainment. When you log expenses, you will have to choose one of these variable categories to put that expense into. The app will track how much money you have remaining in that category by subtracting the total of your expenses in it from the amount you budgeted for it.',
    variable: 'A variable category is used for categories where you have control over how much you spend. Some examples of these are food, clothes, and entertainment. When you log expenses, you will have to choose one of these variable categories to put that expense into. The app will track how much money you have remaining in that category by subtracting the total of your expenses in it from the amount you budgeted for it.'
};

export enum InformationRef {
    EXPENSE = 'expense',
    FIXED = 'fixed',
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
        [InformationRef.TIME_PERIOD]: 0,
        [InformationRef.VARIABLE]: 0
    };
    let scrollRef: ScrollView | null = null;

    useEffect(() => {
        setTimeout(() => {
            if (ref && scrollRef) {
                scrollRef.scrollTo({
                    animated: true,
                    x: 0,
                    y: values[ref] - 16
                });
            }
        }, 1000);
    }, [ref, scrollRef, values]);

    return (
        <ScrollView
            contentContainerStyle={styles.scrollWrapper}
            ref={(ref): void => {
                scrollRef = ref;
            }}
        >
            <View
                onLayout={(event: LayoutChangeEvent): void => {
                    values[InformationRef.TIME_PERIOD] = event.nativeEvent.layout.y;
                }}
                style={styles.wrapper}
            >
                <TitleText>{'Time Period'}</TitleText>
                <RegularText style={styles.subText}>{information.timePeriod}</RegularText>
            </View>
            <View
                onLayout={(event: LayoutChangeEvent): void => {
                    values[InformationRef.EXPENSE] = event.nativeEvent.layout.y;
                }}
                style={styles.wrapper}
            >
                <TitleText>{'Expense'}</TitleText>
                <RegularText style={styles.subText}>{information.expense}</RegularText>
            </View>
            <View
                onLayout={(event: LayoutChangeEvent): void => {
                    values[InformationRef.FIXED] = event.nativeEvent.layout.y;
                }}
                style={styles.wrapper}
            >
                <TitleText>{'Fixed Category'}</TitleText>
                <RegularText style={styles.subText}>{information.fixed}</RegularText>
            </View>
            <View
                onLayout={(event: LayoutChangeEvent): void => {
                    values[InformationRef.VARIABLE] = event.nativeEvent.layout.y;
                }}
                style={styles.wrapper}
            >
                <TitleText>{'Variable Category'}</TitleText>
                <RegularText style={styles.subText}>{information.variable}</RegularText>
            </View>
        </ScrollView>
    );
};

export default Information;
