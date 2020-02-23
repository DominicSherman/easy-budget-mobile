import React, {FC} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@apollo/react-hooks';

import {DeleteVariableCategoryMutation, DeleteVariableCategoryMutationVariables} from '../../../autogen/DeleteVariableCategoryMutation';
import {deleteVariableCategoryMutation} from '../../graphql/mutations';
import {deleteVariableCategoryUpdate} from '../../utils/update-cache-utils';
import {colors} from '../../constants/colors';
import Button from '../generic/Button';
import {getUserId} from '../../services/auth-service';

const DeleteVariableCategoryButton: FC<{variableCategoryId: string}> = ({variableCategoryId}) => {
    const navigation = useNavigation();
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
                backgroundColor: colors.red,
                marginVertical: 32
            }}
        />
    );
};

export default DeleteVariableCategoryButton;