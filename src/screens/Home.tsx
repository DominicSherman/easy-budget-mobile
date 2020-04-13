import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {useSelector} from 'react-redux';
import {User} from '@react-native-community/google-signin';
import moment from 'moment';

import {LargeText, RegularText, SmallText, TitleText} from '../components/generic/Text';
import {getUserId} from '../services/auth-service';
import {homeScreenQuery} from '../graphql/queries';
import {formatTimePeriod, getRoundedDate} from '../services/moment-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import NoActiveTimePeriod from '../components/time-period/NoActiveTimePeriod';
import {IAppState} from '../redux/reducer';
import {HomeScreenQuery, HomeScreenQueryVariables} from '../../autogen/HomeScreenQuery';
import CardView from '../components/generic/CardView';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/dimensions';
import {Route} from '../enums/Route';
import Button from '../components/generic/Button';
import {useBudgetNavigation} from '../utils/hooks';
import {Color} from '../constants/color';

const styles = StyleSheet.create({
    bottomWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 16,
        width: '100%'
    },
    rowCenter: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    titleWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    verticalCenter: {
        alignItems: 'center',
        flexDirection: 'column'
    },
    wrapper: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginHorizontal: 8,
        width: SCREEN_WIDTH - 32
    }
});

const date = getRoundedDate();

const calculateTotal = (items: {amount: number}[]): number => items.reduce((total, item) => total + item.amount, 0);

const Home: React.FC = () => {
    const [timePeriodId, userInformation] = useSelector<IAppState, [string, User]>((state) => [state.timePeriodId, state.userInformation]);
    const queryResult = useQuery<HomeScreenQuery, HomeScreenQueryVariables>(homeScreenQuery, {
        variables: {
            date,
            timePeriodId,
            userId: getUserId()
        }
    });
    const navigation = useBudgetNavigation();

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {timePeriods, fixedCategories, variableCategories, expenses, incomeItems} = queryResult.data;
    const activeTimePeriod = timePeriods[0];

    if (!activeTimePeriod) {
        return (
            <NoActiveTimePeriod />
        );
    }

    const variableCategoriesTotal = calculateTotal(variableCategories);
    const fixedCategoriesTotal = calculateTotal(fixedCategories);
    const expensesTotal = calculateTotal(expenses);
    const incomeTotal = calculateTotal(incomeItems);
    const recurringItems = incomeItems.filter((item) => item.recurring);
    const nonRecurringItems = incomeItems.filter((item) => !item.recurring);
    const fixedExpensesTotal = fixedCategories.filter((category) => category.paid).reduce((total, fixedCategory) => total + fixedCategory.amount, 0);
    const daysRemaining = moment(activeTimePeriod.endDate).diff(moment(), 'd') + 1;
    const daysRemainingText = daysRemaining > 1 ? `${daysRemaining} days remaining` : 'final day today';

    return (
        <SafeAreaView style={{height: '100%'}}>
            <ScrollView
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom: 16
                }}
            >
                <View
                    style={{
                        backgroundColor: Color.blue,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        height: SCREEN_HEIGHT * 0.22,
                        position: 'absolute',
                        top: 0,
                        width: SCREEN_WIDTH,
                        zIndex: -1
                    }}
                />
                <LargeText
                    color={Color.white}
                    style={{marginTop: 16}}
                >
                    {`${formatTimePeriod(activeTimePeriod.beginDate)} - ${formatTimePeriod(moment(activeTimePeriod.endDate).toISOString())} (${moment(activeTimePeriod.endDate).diff(moment(activeTimePeriod.beginDate), 'd')} days)`}
                </LargeText>
                <SmallText
                    color={Color.white}
                    style={{marginTop: 8}}
                >
                    {`${moment().diff(moment(activeTimePeriod.beginDate), 'd')} days done, ${daysRemainingText}`}
                </SmallText>
                <TitleText
                    color={Color.white}
                    style={{marginTop: 16}}
                >
                    {`Welcome, ${userInformation.user.givenName}!`}
                </TitleText>
                <View style={{marginTop: 8}}>
                    <CardView
                        disabled
                        shadow
                        style={styles.wrapper}
                    >
                        <View style={styles.titleWrapper}>
                            <LargeText color={Color.darkBlue}>{'This Month'}</LargeText>
                        </View>
                        <View style={styles.bottomWrapper}>
                            <View style={styles.verticalCenter}>
                                <View style={styles.rowCenter}>
                                    <RegularText>{`$${incomeTotal}`}</RegularText>
                                    <SmallText style={{marginLeft: 8}}>{'income'}</SmallText>
                                </View>
                                <View style={styles.rowCenter}>
                                    <RegularText>{`- $${variableCategoriesTotal}`}</RegularText>
                                    <SmallText style={{marginLeft: 8}}>{'budgeted'}</SmallText>
                                </View>
                                <View style={styles.rowCenter}>
                                    <RegularText>{`- $${fixedCategoriesTotal}`}</RegularText>
                                    <SmallText style={{marginLeft: 8}}>{'fixed categories'}</SmallText>
                                </View>
                            </View>
                            <RegularText>{'='}</RegularText>
                            <View style={styles.verticalCenter}>
                                <RegularText>{`$${incomeTotal - variableCategoriesTotal - fixedCategoriesTotal}`}</RegularText>
                                <SmallText>{'remaining'}</SmallText>
                            </View>
                        </View>
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
                        <View style={styles.titleWrapper}>
                            <LargeText color={Color.darkBlue}>{'Variable Categories'}</LargeText>
                        </View>
                        <View style={styles.bottomWrapper}>
                            <View style={styles.verticalCenter}>
                                <RegularText>{`$${variableCategoriesTotal}`}</RegularText>
                                <SmallText>{'budgeted'}</SmallText>
                            </View>
                            <RegularText>{'-'}</RegularText>
                            <View style={styles.verticalCenter}>
                                <RegularText>{`$${expensesTotal}`}</RegularText>
                                <SmallText>{'spent'}</SmallText>
                            </View>
                            <RegularText>{'='}</RegularText>
                            <View style={styles.verticalCenter}>
                                <RegularText>{`$${variableCategoriesTotal - expensesTotal}`}</RegularText>
                                <SmallText>{'remaining'}</SmallText>
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
                        <View style={styles.titleWrapper}>
                            <LargeText color={Color.darkBlue}>{'Fixed Categories'}</LargeText>
                        </View>
                        <View style={styles.bottomWrapper}>
                            <View style={styles.verticalCenter}>
                                <RegularText>{`$${fixedCategoriesTotal}`}</RegularText>
                                <SmallText>{'to pay'}</SmallText>
                            </View>
                            <RegularText>{'-'}</RegularText>
                            <View style={styles.verticalCenter}>
                                <RegularText>{`$${fixedExpensesTotal}`}</RegularText>
                                <SmallText>{'paid'}</SmallText>
                            </View>
                            <RegularText>{'='}</RegularText>
                            <View style={styles.verticalCenter}>
                                <RegularText>{`$${fixedCategoriesTotal - fixedExpensesTotal}`}</RegularText>
                                <SmallText>{'still to pay'}</SmallText>
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
                        <View style={styles.titleWrapper}>
                            <LargeText color={Color.darkBlue}>{'Income'}</LargeText>
                        </View>
                        {
                            nonRecurringItems.length ?
                                <View style={styles.bottomWrapper}>
                                    <View style={styles.verticalCenter}>
                                        <RegularText>{`$${calculateTotal(recurringItems)}`}</RegularText>
                                        <SmallText>{'per time period'}</SmallText>
                                    </View>
                                    <RegularText>{'+'}</RegularText>
                                    <View style={styles.verticalCenter}>
                                        <RegularText>{`$${calculateTotal(nonRecurringItems)}`}</RegularText>
                                        <SmallText>{'additional'}</SmallText>
                                    </View>
                                    <RegularText>{'='}</RegularText>
                                    <View style={styles.verticalCenter}>
                                        <RegularText>{`$${incomeTotal}`}</RegularText>
                                        <SmallText>{'total'}</SmallText>
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
                <Button
                    onPress={(): void => {
                        navigation.navigate({
                            name: Route.EXPENSES,
                            params: {}
                        });
                    }}
                    text={'Create Expense'}
                    wrapperStyle={{marginTop: 48}}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
