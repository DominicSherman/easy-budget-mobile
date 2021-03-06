import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import moment from 'moment';
import {NetworkStatus} from 'apollo-client';

import {FontWeight, LargeText, RegularText, SmallText, TinyText, TitleText} from '../components/generic/Text';
import {getUserId} from '../services/auth-service';
import {homeScreenQuery} from '../graphql/queries';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {HomeScreenQuery, HomeScreenQueryVariables} from '../../autogen/HomeScreenQuery';
import CardView from '../components/generic/CardView';
import {CARD_WIDTH} from '../constants/dimensions';
import {Route} from '../enums/Route';
import Button from '../components/generic/Button';
import {useBudgetNavigation, useMode, useTimePeriod, useUserInformation} from '../utils/hooks';
import {Color} from '../constants/color';
import {textWrapperUnderlined} from '../styles/shared-styles';
import {getThemedSelectedColor, Theme} from '../services/theme-service';
import {getFormattedTimePeriodLength, getFormattedTimePeriodText} from '../utils/utils';
import {TimePeriodType} from '../redux/reducer';
import BrowsingHeader from '../components/time-period/BrowsingHeader';
import BackgroundHeader from '../components/generic/BackgroundHeader';

import TimePeriods from './TimePeriods';

const styles = StyleSheet.create({
    bottomWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 8,
        width: '100%'
    },
    rowCenter: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    titleWrapper: textWrapperUnderlined,
    verticalCenter: {
        alignItems: 'center',
        flexDirection: 'column'
    },
    wrapper: {
        alignItems: 'center',
        flexDirection: 'column',
        marginHorizontal: 16,
        width: CARD_WIDTH
    }
});

const calculateTotal = (items: { amount: number }[]): number => items.reduce((total, item) => total + item.amount, 0);

const Home: React.FC = () => {
    const timePeriod = useTimePeriod();
    const userInformation = useUserInformation();
    const queryResult = useQuery<HomeScreenQuery, HomeScreenQueryVariables>(homeScreenQuery, {
        notifyOnNetworkStatusChange: true,
        skip: !timePeriod,
        variables: {
            timePeriodId: timePeriod?.timePeriodId || '',
            userId: getUserId()
        }
    });
    const navigation = useBudgetNavigation();
    const mode = useMode();

    if (!timePeriod) {
        return (
            <TimePeriods />
        );
    }

    if (!queryResult.data || queryResult.networkStatus === NetworkStatus.setVariables) {
        return getEarlyReturn(queryResult);
    }

    const {refetch, networkStatus, data} = queryResult;
    const {fixedCategories, variableCategories, expenses, incomeItems, savingCategories, debtCategories} = data;
    const variableCategoriesTotal = calculateTotal(variableCategories);
    const fixedCategoriesTotal = calculateTotal(fixedCategories);
    const expensesTotal = calculateTotal(expenses);
    const incomeTotal = calculateTotal(incomeItems);
    const recurringItems = incomeItems.filter((item) => item.recurring);
    const nonRecurringItems = incomeItems.filter((item) => !item.recurring);
    const savingCategoriesTotal = calculateTotal(savingCategories);
    const debtCategoriesTotal = calculateTotal(debtCategories);
    const fixedExpensesTotal = fixedCategories.filter((category) => category.paid).reduce((total, fixedCategory) => total + fixedCategory.amount, 0);
    const daysRemaining = moment(timePeriod.endDate).diff(moment(), 'd') + 1;
    const daysRemainingText = daysRemaining > 1 ? `${daysRemaining} days remaining` : 'final day today';

    return (
        <View style={{height: '100%'}}>
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom: 64
                }}
                refreshControl={
                    <RefreshControl
                        onRefresh={refetch}
                        refreshing={networkStatus === NetworkStatus.refetch}
                    />
                }
            >
                <BackgroundHeader />
                <BrowsingHeader />
                {
                    timePeriod.type === TimePeriodType.ACTIVE &&
                        <>
                            <RegularText
                                color={Color.white}
                                fontWeight={FontWeight.BOLD}
                                style={{marginTop: 16}}
                            >
                                {`${getFormattedTimePeriodText(timePeriod)} ${getFormattedTimePeriodLength(timePeriod)}`}
                            </RegularText>
                            <SmallText
                                color={Color.white}
                                style={{marginTop: 8}}
                            >
                                {`${moment().diff(moment(timePeriod.beginDate), 'd')} days done, ${daysRemainingText}`}
                            </SmallText>
                        </>
                }
                <TitleText
                    color={Color.white}
                    style={{marginTop: 16}}
                >
                    {`Welcome, ${userInformation.user.givenName}!`}
                </TitleText>
                <View style={{marginTop: 8}}>
                    <CardView
                        onPress={(): void => {
                            navigation.navigate({
                                name: Route.EXPENSES,
                                params: {}
                            });
                        }}
                        shadow
                        style={styles.wrapper}
                    >
                        <View
                            style={[styles.titleWrapper, {borderBottomColor: getThemedSelectedColor(mode, Theme.GREEN)}]}
                        >
                            <LargeText>{'This Month'}</LargeText>
                        </View>
                        <View style={styles.bottomWrapper}>
                            <View style={styles.verticalCenter}>
                                <View style={styles.rowCenter}>
                                    <RegularText>{`$${incomeTotal}`}</RegularText>
                                    <TinyText style={{marginLeft: 8}}>{'income'}</TinyText>
                                </View>
                                <View style={styles.rowCenter}>
                                    <RegularText>{`- $${variableCategoriesTotal}`}</RegularText>
                                    <TinyText style={{marginLeft: 8}}>{'budgeted'}</TinyText>
                                </View>
                                <View style={styles.rowCenter}>
                                    <RegularText>{`- $${fixedCategoriesTotal}`}</RegularText>
                                    <TinyText style={{marginLeft: 8}}>{'fixed categories'}</TinyText>
                                </View>
                            </View>
                            <RegularText>{'='}</RegularText>
                            <View style={styles.verticalCenter}>
                                <RegularText>{`$${incomeTotal - variableCategoriesTotal - fixedCategoriesTotal}`}</RegularText>
                                <TinyText>{'remaining'}</TinyText>
                            </View>
                        </View>
                        <Button
                            onPress={(): void => {
                                navigation.navigate({
                                    name: Route.EXPENSES,
                                    params: {}
                                });
                            }}
                            text={'Create Expense'}
                            wrapperStyle={{marginTop: 16}}
                        />
                    </CardView>
                </View>
                <View style={{marginTop: 8}}>
                    <CardView
                        onPress={(): void => {
                            navigation.navigate({
                                name: Route.VARIABLE_CATEGORIES,
                                params: {}
                            });
                        }}
                        shadow
                        style={styles.wrapper}
                    >
                        <View
                            style={[styles.titleWrapper, {borderBottomColor: getThemedSelectedColor(mode, Theme.BLUE)}]}
                        >
                            <LargeText>{'Variable Categories'}</LargeText>
                        </View>
                        <View style={styles.bottomWrapper}>
                            <View style={styles.verticalCenter}>
                                <RegularText>{`$${variableCategoriesTotal.toFixed()}`}</RegularText>
                                <TinyText>{'budgeted'}</TinyText>
                            </View>
                            <RegularText>{'-'}</RegularText>
                            <View style={styles.verticalCenter}>
                                <RegularText>{`$${expensesTotal.toFixed()}`}</RegularText>
                                <TinyText>{'spent'}</TinyText>
                            </View>
                            <RegularText>{'='}</RegularText>
                            <View style={styles.verticalCenter}>
                                <RegularText>{`$${(variableCategoriesTotal - expensesTotal).toFixed()}`}</RegularText>
                                <TinyText>{'remaining'}</TinyText>
                            </View>
                        </View>
                    </CardView>
                </View>
                <View style={{marginTop: 8}}>
                    <CardView
                        onPress={(): void => {
                            navigation.navigate({
                                name: Route.FIXED_CATEGORIES,
                                params: {}
                            });
                        }}
                        shadow
                        style={styles.wrapper}
                    >
                        <View
                            style={[styles.titleWrapper, {borderBottomColor: getThemedSelectedColor(mode, Theme.RED)}]}
                        >
                            <LargeText>{'Fixed Categories'}</LargeText>
                        </View>
                        <View style={styles.bottomWrapper}>
                            <View style={styles.verticalCenter}>
                                <RegularText>{`$${fixedCategoriesTotal}`}</RegularText>
                                <TinyText>{'to pay'}</TinyText>
                            </View>
                            <RegularText>{'-'}</RegularText>
                            <View style={styles.verticalCenter}>
                                <RegularText>{`$${fixedExpensesTotal}`}</RegularText>
                                <TinyText>{'paid'}</TinyText>
                            </View>
                            <RegularText>{'='}</RegularText>
                            <View style={styles.verticalCenter}>
                                <RegularText>{`$${fixedCategoriesTotal - fixedExpensesTotal}`}</RegularText>
                                <TinyText>{'still to pay'}</TinyText>
                            </View>
                        </View>
                    </CardView>
                </View>
                <View style={{marginTop: 8}}>
                    <CardView
                        onPress={(): void => {
                            navigation.navigate({
                                name: Route.INCOME,
                                params: {}
                            });
                        }}
                        shadow
                        style={styles.wrapper}
                    >
                        <View
                            style={[styles.titleWrapper, {borderBottomColor: getThemedSelectedColor(mode, Theme.GOLD)}]}
                        >
                            <LargeText>{'Income'}</LargeText>
                        </View>
                        {
                            nonRecurringItems.length ?
                                <View style={styles.bottomWrapper}>
                                    <View style={styles.verticalCenter}>
                                        <RegularText>{`$${calculateTotal(recurringItems)}`}</RegularText>
                                        <TinyText>{'per time period'}</TinyText>
                                    </View>
                                    <RegularText>{'+'}</RegularText>
                                    <View style={styles.verticalCenter}>
                                        <RegularText>{`$${calculateTotal(nonRecurringItems)}`}</RegularText>
                                        <TinyText>{'additional'}</TinyText>
                                    </View>
                                    <RegularText>{'='}</RegularText>
                                    <View style={styles.verticalCenter}>
                                        <RegularText>{`$${incomeTotal}`}</RegularText>
                                        <TinyText>{'total'}</TinyText>
                                    </View>
                                </View>
                                :
                                <View style={styles.bottomWrapper}>
                                    <View style={styles.verticalCenter}>
                                        <RegularText style={{fontWeight: '600'}}>
                                            {`$${calculateTotal(recurringItems)}`}
                                            <RegularText style={{fontWeight: '400'}}>{' per time period'}</RegularText>
                                        </RegularText>
                                    </View>
                                </View>
                        }
                    </CardView>
                </View>
                <View style={{marginTop: 8}}>
                    <CardView
                        onPress={(): void => {
                            navigation.navigate({
                                name: Route.SAVINGS,
                                params: {}
                            });
                        }}
                        shadow
                        style={styles.wrapper}
                    >
                        <View
                            style={[styles.titleWrapper, {borderBottomColor: getThemedSelectedColor(mode, Theme.PURPLE)}]}
                        >
                            <LargeText>{'Savings'}</LargeText>
                        </View>
                        <View style={styles.bottomWrapper}>
                            <View style={styles.verticalCenter}>
                                <RegularText style={{fontWeight: '600'}}>
                                    {`$${savingCategoriesTotal}`}
                                    <RegularText style={{fontWeight: '400'}}>{' saved'}</RegularText>
                                </RegularText>
                            </View>
                        </View>
                    </CardView>
                </View>
                <View style={{marginTop: 8}}>
                    <CardView
                        onPress={(): void => {
                            navigation.navigate({
                                name: Route.DEBT,
                                params: {}
                            });
                        }}
                        shadow
                        style={styles.wrapper}
                    >
                        <View
                            style={[styles.titleWrapper, {borderBottomColor: getThemedSelectedColor(mode, Theme.LIGHT_BLUE)}]}
                        >
                            <LargeText>{'Debt'}</LargeText>
                        </View>
                        <View style={styles.bottomWrapper}>
                            <View style={styles.verticalCenter}>
                                <RegularText style={{fontWeight: '600'}}>
                                    {`$${debtCategoriesTotal}`}
                                    <RegularText style={{fontWeight: '400'}}>{' owed'}</RegularText>
                                </RegularText>
                            </View>
                        </View>
                    </CardView>
                </View>
            </ScrollView>
        </View>
    );
};

export default Home;
