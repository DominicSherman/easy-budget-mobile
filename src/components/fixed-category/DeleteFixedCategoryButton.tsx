import React, {FC} from 'react';
import {useMutation} from '@apollo/react-hooks';

import {DeleteFixedCategoryMutation, DeleteFixedCategoryMutationVariables} from '../../../autogen/DeleteFixedCategoryMutation';
import {deleteFixedCategoryMutation} from '../../graphql/mutations';
import {deleteFixedCategoryUpdate} from '../../utils/update-cache-utils';
import {Color} from '../../constants/color';
import Button from '../generic/Button';
import {getUserId} from '../../services/auth-service';
import {useBudgetNavigation} from '../../utils/hooks';

const DeleteFixedCategoryButton: FC<{fixedCategoryId: string}> = ({fixedCategoryId}) => {
    const navigation = useBudgetNavigation();
    const [deleteFixedCategory] = useMutation<DeleteFixedCategoryMutation, DeleteFixedCategoryMutationVariables>(deleteFixedCategoryMutation, {
        optimisticResponse: {
            deleteFixedCategory: fixedCategoryId
        },
        update: deleteFixedCategoryUpdate,
        variables: {
            fixedCategoryId,
            userId: getUserId()
        }
    });
    const onPressDelete = (): void => {
        navigation.goBack();
        deleteFixedCategory();
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

export default DeleteFixedCategoryButton;
