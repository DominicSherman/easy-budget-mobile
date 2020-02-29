import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';

import {IVariableCategory} from '../../../autogen/IVariableCategory';
import {deleteVariableCategoryMutation, updateVariableCategoryMutation} from '../../graphql/mutations';
import {
    UpdateVariableCategoryMutation,
    UpdateVariableCategoryMutationVariables
} from '../../../autogen/UpdateVariableCategoryMutation';
import CategoryForm from '../generic/CategoryForm';
import {
    DeleteVariableCategoryMutation,
    DeleteVariableCategoryMutationVariables
} from '../../../autogen/DeleteVariableCategoryMutation';
import {deleteVariableCategoryUpdate} from '../../utils/update-cache-utils';
import {getUserId} from '../../services/auth-service';
import {Alert} from 'react-native';
import {easeInTransition} from '../../services/animation-service';

interface IEditVariableCategoryFormProps {
    onUpdate?: () => void
    variableCategory: IVariableCategory
}

const EditVariableCategoryForm: FC<IEditVariableCategoryFormProps> = ({onUpdate, variableCategory}) => {
    const {amount, name, variableCategoryId, userId} = variableCategory;
    const [updatedAmount, setUpdatedAmount] = useState(amount.toString());
    const [updatedName, setUpdatedName] = useState(name);
    const originalValues = {
        amount,
        name
    };
    const updatedValues = {
        amount: Number(updatedAmount),
        name: updatedName
    };
    const [updateVariableCategory] = useMutation<UpdateVariableCategoryMutation, UpdateVariableCategoryMutationVariables>(updateVariableCategoryMutation, {
        optimisticResponse: {
            updateVariableCategory: {
                ...variableCategory,
                ...updatedValues
            }
        },
        variables: {
            variableCategory: {
                userId,
                variableCategoryId,
                ...updatedValues
            }
        }
    });
    const onPress = (): void => {
        updateVariableCategory();

        if (onUpdate) {
            onUpdate();
        }
    };
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
        Alert.alert(
            `Delete ${variableCategory.name}?`,
            '',
            [
                {text: 'Cancel'},
                {
                    onPress: (): void => {
                        easeInTransition();
                        deleteVariableCategory();
                    },
                    text: 'Confirm'
                }
            ]
        );
    };
    const disabled = JSON.stringify(originalValues) === JSON.stringify(updatedValues);

    return (
        <CategoryForm
            amount={updatedAmount}
            buttonText={'Update'}
            disabled={disabled}
            name={updatedName}
            onPress={onPress}
            secondButtonText={'Delete'}
            secondOnPress={onPressDelete}
            setAmount={setUpdatedAmount}
            setName={setUpdatedName}
        />
    );
};

export default EditVariableCategoryForm;
