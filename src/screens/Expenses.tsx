import React, {FC} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useQuery} from '@apollo/react-hooks';

import {IAppState} from '../redux/reducer';
import {getExpensesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {GetExpenses, GetExpensesVariables} from '../../autogen/GetExpenses';
import {SCREEN_WIDTH} from '../constants/dimensions';
import DefaultText from '../components/generic/DefaultText';
import {formatExpenseDate} from '../services/moment-service';
import {sortByDate} from '../utils/sorting-utils';
import CreateExpenseForm from '../components/budget/CreateExpenseForm';
import NoActiveTimePeriod from '../components/budget/NoActiveTimePeriod';

const styles = StyleSheet.create({
    fixedWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%'
    }
});

const Expenses: FC = () => {
    const timePeriodId = useSelector<IAppState, string>((state) => state.timePeriodId);
    const queryResult = useQuery<GetExpenses, GetExpensesVariables>(getExpensesQuery, {
        skip: !timePeriodId,
        variables: {
            timePeriodId,
            userId: getUserId()
        }
    });

    if (!timePeriodId) {
        return <NoActiveTimePeriod />;
    }

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {expenses, variableCategories} = queryResult.data;
    const sortedExpenses = expenses.sort(sortByDate);

    const getCategoryName = (variableCategoryId: string): string | undefined => variableCategories.find(
        (variableCategory) => variableCategory.variableCategoryId === variableCategoryId
    )?.name;

    return (
        <FlatList
            ListHeaderComponent={<CreateExpenseForm />}
            data={sortedExpenses}
            keyExtractor={(item): string => item.expenseId}
            renderItem={({item}): JSX.Element =>
                <View
                    key={item.variableCategoryId}
                    style={styles.fixedWrapper}
                >
                    <View style={{width: SCREEN_WIDTH / 3}}>
                        <DefaultText>{getCategoryName(item.variableCategoryId)}</DefaultText>
                    </View>
                    <View style={{width: SCREEN_WIDTH / 3}}>
                        <DefaultText>{formatExpenseDate(item.date)}</DefaultText>
                    </View>
                    <View style={{width: SCREEN_WIDTH / 3}}>
                        <DefaultText>{item.amount.toFixed(2)}</DefaultText>
                    </View>
                </View>
            }
            style={{marginBottom: 8}}
        />
    );
};

export default Expenses;
