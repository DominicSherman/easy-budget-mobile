import React from 'react';
import {ScrollView} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import {IScreenFC} from '../types/global';
import {Route} from '../enums/Route';
import {getExpenseQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {GetExpense, GetExpenseVariables} from '../../autogen/GetExpense';
import EditExpenseForm from '../components/expense/EditExpenseForm';
import DeleteExpenseButton from '../components/expense/DeleteExpenseButton';

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
        <ScrollView
            contentContainerStyle={{alignItems: 'center'}}
            style={{height: '100%'}}
        >
            <EditExpenseForm expense={expense} />
            <DeleteExpenseButton expenseId={expenseId} />
        </ScrollView>
    );
};

export default Expense;
