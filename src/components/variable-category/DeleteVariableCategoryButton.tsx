import React, {FC} from 'react';
import {useMutation} from '@apollo/react-hooks';

import {DeleteVariableCategoryMutation, DeleteVariableCategoryMutationVariables} from '../../../autogen/DeleteVariableCategoryMutation';
import {deleteVariableCategoryMutation} from '../../graphql/mutations';
import {deleteVariableCategoryUpdate} from '../../utils/update-cache-utils';
import {Color} from '../../constants/color';
import Button from '../generic/Button';
import {getUserId} from '../../services/auth-service';
import {useBudgetNavigation} from '../../utils/hooks';

const DeleteVariableCategoryButton: FC<{variableCategoryId: string}> = ({variableCategoryId}) => {
    const navigation = useBudgetNavigation();
    const [deleteVariableCategory] = useMutation<DeleteVariableCategoryMutation, DeleteVariableCategoryMutationVariables>(deleteVariableCategoryMutation, {
        optimisticResponse: {
            deleteVariableCategory: variableCategoryId
        },
        update: deleteVariableCategoryUpdate,
        variables: {
            userId: getUserId(),
            variableCategoryId
        }
    });
    const onPressDelete = (): void => {
        navigation.goBack();
        deleteVariableCategory();
    };

    return (
        <Button
            onPress={onPressDelete}
            text={'Delete'}
            wrapperStyle={{
                backgroundColor: Color.peach,
                marginVertical: 32
            }}
        />
    );
};

export default DeleteVariableCategoryButton;
