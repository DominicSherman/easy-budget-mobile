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
        variables: {
            timePeriodId,
            userId: getUserId()
        }
    });

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {expenses} = queryResult.data;
    const sortedExpenses = expenses.sort(sortByDate);

    return (
        <FlatList
            data={sortedExpenses}
            keyExtractor={(item): string => item.expenseId}
            renderItem={({item}): JSX.Element =>
                <View
                    key={item.variableCategoryId}
                    style={styles.fixedWrapper}
                >
                    <View style={{width: SCREEN_WIDTH / 3}}>
                        <DefaultText>{item.name}</DefaultText>
                    </View>
                    <View style={{width: SCREEN_WIDTH / 3}}>
                        <DefaultText>{formatExpenseDate(item.date)}</DefaultText>
                    </View>
                    <View style={{width: SCREEN_WIDTH / 3}}>
                        <DefaultText>{item.amount}</DefaultText>
                    </View>
                </View>
            }
        />
    );
};

export default Expenses;
