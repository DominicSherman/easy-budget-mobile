import React, {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@apollo/react-hooks';

import {DeleteExpenseMutation, DeleteExpenseMutationVariables} from '../../../autogen/DeleteExpenseMutation';
import {deleteExpenseMutation} from '../../graphql/mutations';
import {deleteExpenseUpdate} from '../../utils/update-cache-utils';
import {colors} from '../../constants/colors';
import Button from '../generic/Button';
import {getUserId} from '../../services/auth-service';

const DeleteExpenseButton: FC<{expenseId: string}> = ({expenseId}) => {
    const navigation = useNavigation();
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
                backgroundColor: colors.red,
                marginTop: 32
            }}
        />
    );
};

export default DeleteExpenseButton;
