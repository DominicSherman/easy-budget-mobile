import React from 'react';
import {View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import {IScreenFC} from '../types/global';
import {Route} from '../enums/Route';
import {getExpenseQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {GetExpense, GetExpenseVariables} from '../../autogen/GetExpense';
import EditExpenseForm from '../components/budget/EditExpenseForm';

export interface IExpenseProps {
    expenseId: string
}

const Expense: IScreenFC<Route.EXPENSE> = ({route: {params: {expenseId}}}) => {
    const queryResult = useQuery<GetExpense, GetExpenseVariables>(getExpenseQuery, {
        variables: {
            expenseId,
            userId: getUserId()
        }
    });

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {expense} = queryResult.data;

    return (
        <View style={{alignItems: 'center'}}>
            <EditExpenseForm expense={expense} />
        </View>
    );
};

export default Expense;
