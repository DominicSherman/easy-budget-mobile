import React, {FC, useState} from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {useNavigation} from '@react-navigation/native';

import {updateExpenseMutation} from '../../graphql/mutations';
import {IExpense} from '../../../autogen/IExpense';
import {UpdateExpenseMutation, UpdateExpenseMutationVariables} from '../../../autogen/UpdateExpenseMutation';
import {GetExpenses, GetExpensesVariables} from '../../../autogen/GetExpenses';
import {getExpensesQuery} from '../../graphql/queries';
import {getUserId} from '../../services/auth-service';
import {useTimePeriodId} from '../../redux/hooks';
import {sortByName} from '../../utils/sorting-utils';

import ExpenseForm from './ExpenseForm';

const EditExpenseForm: FC<{expense: IExpense}> = ({expense}) => {
    const navigation = useNavigation();
    const {amount, name, variableCategoryId, expenseId, userId} = expense;
    const [updatedAmount, setUpdatedAmount] = useState(amount.toString());
    const [updatedName, setUpdatedName] = useState(name);
    const [updatedCategoryId, setUpdatedCategoryId] = useState(variableCategoryId);
    const originalValues = {
        amount,
        name,
        variableCategoryId
    };
    const updatedValues = {
        amount: Number(updatedAmount),
        name: updatedName,
        variableCategoryId: updatedCategoryId
    };
    const timePeriodId = useTimePeriodId();
    const queryResult = useQuery<GetExpenses, GetExpensesVariables>(getExpensesQuery, {
        variables: {
            timePeriodId,
            userId: getUserId()
        }
    });
    const [updateExpense] = useMutation<UpdateExpenseMutation, UpdateExpenseMutationVariables>(updateExpenseMutation, {
        optimisticResponse: {
            updateExpense: {
                ...expense,
                ...updatedValues
            }
        },
        variables: {
            expense: {
                expenseId,
                userId,
                ...updatedValues
            }
        }
    });
    const onPress = (): void => {
        updateExpense();
        navigation.goBack();
    };
    const disabled = JSON.stringify(originalValues) === JSON.stringify(updatedValues);

    if (!queryResult.data) {
        return null;
    }

    return (
        <ExpenseForm
            amount={updatedAmount}
            disabled={disabled}
            headerText={'Edit Fixed Category'}
            name={updatedName}
            onPress={onPress}
            setAmount={setUpdatedAmount}
            setName={setUpdatedName}
            setVariableCategoryId={setUpdatedCategoryId}
            variableCategories={queryResult.data.variableCategories.sort(sortByName)}
            variableCategoryId={updatedCategoryId}
        />
    );
};

export default EditExpenseForm;
