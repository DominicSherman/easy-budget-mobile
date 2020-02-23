import React, {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@apollo/react-hooks';

import {DeleteFixedCategoryMutation, DeleteFixedCategoryMutationVariables} from '../../../autogen/DeleteFixedCategoryMutation';
import {deleteFixedCategoryMutation} from '../../graphql/mutations';
import {deleteFixedCategoryUpdate} from '../../utils/update-cache-utils';
import {colors} from '../../constants/colors';
import Button from '../generic/Button';
import {getUserId} from '../../services/auth-service';

const DeleteFixedCategoryButton: FC<{fixedCategoryId: string}> = ({fixedCategoryId}) => {
    const navigation = useNavigation();
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
                backgroundColor: colors.red,
                marginTop: 32
            }}
        />
    );
};

export default DeleteFixedCategoryButton;
