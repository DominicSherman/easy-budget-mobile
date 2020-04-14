import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {Alert} from 'react-native';

import {IVariableCategory} from '../../../autogen/IVariableCategory';
import {deleteVariableCategoryMutation, updateVariableCategoryMutation} from '../../graphql/mutations';
import {
    UpdateVariableCategoryMutation,
    UpdateVariableCategoryMutationVariables
} from '../../../autogen/UpdateVariableCategoryMutation';
import Form from '../generic/Form';
import {
    DeleteVariableCategoryMutation,
    DeleteVariableCategoryMutationVariables
} from '../../../autogen/DeleteVariableCategoryMutation';
import {deleteVariableCategoryUpdate} from '../../utils/update-cache-utils';
import {easeInTransition} from '../../services/animation-service';
import {Color} from '../../constants/color';
import {IInputProps} from '../generic/Input';

interface IEditVariableCategoryFormProps {
    toggleExpanded: () => void
    variableCategory: IVariableCategory
}

const EditVariableCategoryForm: FC<IEditVariableCategoryFormProps> = ({toggleExpanded, variableCategory}) => {
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
        toggleExpanded();
    };
    const [deleteVariableCategory] = useMutation<DeleteVariableCategoryMutation, DeleteVariableCategoryMutationVariables>(deleteVariableCategoryMutation, {
        optimisticResponse: {
            deleteVariableCategory: variableCategoryId
        },
        update: deleteVariableCategoryUpdate,
        variables: {
            userId: variableCategory.userId,
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
    const disabled = JSON.stringify(originalValues) === JSON.stringify(updatedValues) || !name.length || !updatedAmount.length;
    const inputs: IInputProps[] = [{
        onChange: setUpdatedName,
        title: 'Category Name *',
        value: updatedName
    }, {
        keyboardType: 'number-pad',
        onChange: setUpdatedAmount,
        title: 'Category Amount *',
        value: updatedAmount
    }];
    const buttons = [{
        onPress: onPressDelete,
        text: 'Delete',
        wrapperStyle: {backgroundColor: Color.peach}
    }, {
        disabled,
        onPress,
        text: 'Update'
    }];

    return (
        <Form
            buttons={buttons}
            inputs={inputs}
        />
    );
};

export default EditVariableCategoryForm;
