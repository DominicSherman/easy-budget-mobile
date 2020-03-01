import React, {FC, useState} from 'react';
import {useSelector} from 'react-redux';
import {useMutation, useQuery} from '@apollo/react-hooks';
import uuid from 'uuid';
import moment from 'moment';

import {IAppState} from '../../redux/reducer';
import {getExpensesQuery} from '../../graphql/queries';
import {getUserId} from '../../services/auth-service';
import {GetExpenses, GetExpensesVariables} from '../../../autogen/GetExpenses';
import {sortByDate, sortByName} from '../../utils/sorting-utils';
import {createExpenseMutation} from '../../graphql/mutations';
import {CreateExpenseMutation, CreateExpenseMutationVariables} from '../../../autogen/CreateExpenseMutation';
import {createExpenseUpdate} from '../../utils/update-cache-utils';

import ExpenseForm from './ExpenseForm';

const CreateExpenseForm: FC = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const timePeriodId = useSelector<IAppState, string>((state) => state.timePeriodId);
    const queryResult = useQuery<GetExpenses, GetExpensesVariables>(getExpensesQuery, {
        variables: {
            timePeriodId,
            userId: getUserId()
        }
    });
    const expense = {
        amount: Number(amount),
        date: moment().toISOString(),
        expenseId: uuid.v4(),
        name,
        timePeriodId,
        userId: getUserId(),
        variableCategoryId: categoryId || ''
    };
    const [createExpense] = useMutation<CreateExpenseMutation, CreateExpenseMutationVariables>(createExpenseMutation, {
        optimisticResponse: {
            createExpense: {
                __typename: 'Expense',
                ...expense
            }
        },
        update: createExpenseUpdate,
        variables: {
            expense
        }
    });
    const onPress = (): void => {
        createExpense();
        setName('');
        setAmount('');
    };

    if (!queryResult.data) {
        return null;
    }

    const {expenses, variableCategories} = queryResult.data;
    const sortedVariableCategories = variableCategories.sort(sortByName);
    const sortedExpenses = expenses.sort(sortByDate);
    const firstCategory = sortedVariableCategories[0];
    const mostRecentExpense = sortedExpenses[0];

    if (!categoryId) {
        if (mostRecentExpense) {
            setCategoryId(mostRecentExpense.variableCategoryId);
        } else if (firstCategory) {
            setCategoryId(firstCategory.variableCategoryId);
        }
    }

    return (
        <ExpenseForm
            amount={amount}
            buttonText={'Create'}
            headerText={'Create Expense'}
            name={name}
            onPress={onPress}
            setAmount={setAmount}
            setName={setName}
            setVariableCategoryId={setCategoryId}
            variableCategories={sortedVariableCategories}
            variableCategoryId={categoryId}
        />
    );
};

export default CreateExpenseForm;
