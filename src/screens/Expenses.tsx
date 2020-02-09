import React, {FC} from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {useQuery} from '@apollo/react-hooks';

import {IAppState} from '../redux/reducer';
import {getExpensesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {GetExpenses, GetExpensesVariables} from '../../autogen/GetExpenses';
import {sortByDate} from '../utils/sorting-utils';
import CreateExpenseForm from '../components/budget/CreateExpenseForm';
import NoActiveTimePeriod from '../components/budget/NoActiveTimePeriod';
import ExpenseItem from '../components/budget/ExpenseItem';

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

    return (
        <FlatList
            ListHeaderComponent={<CreateExpenseForm />}
            data={sortedExpenses}
            keyExtractor={(item): string => item.expenseId}
            renderItem={({item}): JSX.Element =>
                <ExpenseItem
                    expense={item}
                    variableCategories={variableCategories}
                />
            }
            style={{marginBottom: 8}}
        />
    );
};

export default Expenses;
