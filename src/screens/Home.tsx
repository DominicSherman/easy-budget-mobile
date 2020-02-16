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
import NoActiveTimePeriod from '../components/budget/NoActiveTimePeriod';
import {IAppState} from '../redux/reducer';
import {HomeScreenQuery, HomeScreenQueryVariables} from '../../autogen/HomeScreenQuery';
import CardView from '../components/generic/CardView';
import {SCREEN_WIDTH} from '../constants/dimensions';
import CreateExpenseForm from '../components/budget/CreateExpenseForm';

const styles = StyleSheet.create({
    bottomWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 16,
        width: '100%'
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
        width: SCREEN_WIDTH - 16
    }
});

const date = getRoundedDate();

const Home: React.FC = () => {
    const [timePeriodId, userInformation] = useSelector<IAppState, [string, User]>((state) => [state.timePeriodId, state.userInformation]);
    const queryResult = useQuery<HomeScreenQuery, HomeScreenQueryVariables>(homeScreenQuery, {
        variables: {
            date,
            timePeriodId,
            userId: getUserId()
        }
    });

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {timePeriods, fixedCategories, variableCategories, expenses} = queryResult.data;
    const activeTimePeriod = timePeriods[0];

    if (!activeTimePeriod) {
        return (
            <NoActiveTimePeriod />
        );
    }

    const variableCategoriesTotal = variableCategories.reduce((total, variableCategory) => total + variableCategory.amount, 0);
    const fixedCategoriesTotal = fixedCategories.reduce((total, fixedCategory) => total + fixedCategory.amount, 0);
    const expensesTotal = expenses.reduce((total, expense) => total + expense.amount, 0);
    const fixedExpensesTotal = fixedCategories.filter((category) => category.paid).reduce((total, fixedCategory) => total + fixedCategory.amount, 0);

    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{alignItems: 'center'}}
            >
                <LargeText style={{marginTop: 16}}>
                    {`${formatTimePeriod(activeTimePeriod.beginDate)} - ${formatTimePeriod(activeTimePeriod.endDate)} (${moment(activeTimePeriod.endDate).diff(moment(activeTimePeriod.beginDate), 'd') + 1} days)`}
                </LargeText>
                <SmallText>
                    {`${moment().diff(moment(activeTimePeriod.beginDate), 'd')} days done, ${moment(activeTimePeriod.endDate).diff(moment(), 'd')} days remaining`}
                </SmallText>
                <TitleText style={{marginTop: 16}}>
                    {`Welcome, ${userInformation.user.givenName}! 🎉`}
                </TitleText>
                <View style={{marginTop: 32}}>
                    <CardView
                        disabled
                        shadow
                        style={styles.wrapper}
                    >
                        <View style={styles.titleWrapper}>

                            <LargeText>{'Variable Categories'}</LargeText>
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
                <View style={{marginVertical: 32}}>
                    <CardView
                        disabled
                        shadow
                        style={styles.wrapper}
                    >
                        <View style={styles.titleWrapper}>

                            <LargeText>{'Fixed Categories'}</LargeText>
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
                <CreateExpenseForm />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
