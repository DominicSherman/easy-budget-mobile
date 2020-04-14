import React, {FC} from 'react';
import {useMutation} from '@apollo/react-hooks';

import {DeleteExpenseMutation, DeleteExpenseMutationVariables} from '../../../autogen/DeleteExpenseMutation';
import {deleteExpenseMutation} from '../../graphql/mutations';
import {deleteExpenseUpdate} from '../../utils/update-cache-utils';
import {Color} from '../../constants/color';
import Button from '../generic/Button';
import {getUserId} from '../../services/auth-service';
import {useBudgetNavigation} from '../../utils/hooks';

const DeleteExpenseButton: FC<{expenseId: string}> = ({expenseId}) => {
    const navigation = useBudgetNavigation();
    const [deleteExpense] = useMutation<DeleteExpenseMutation, DeleteExpenseMutationVariables>(deleteExpenseMutation, {
        optimisticResponse: {
            deleteExpense: expenseId
        },
        update: deleteExpenseUpdate,
        variables: {
            expenseId,
            userId: getUserId()
        }
    });
    const onPressDelete = (): void => {
        navigation.goBack();
        deleteExpense();
    };

    return (
        <Button
            onPress={onPressDelete}
            text={'Delete'}
            wrapperStyle={{
                backgroundColor: Color.peach,
                marginTop: 32
            }}
        />
    );
};

export default DeleteExpenseButton;
