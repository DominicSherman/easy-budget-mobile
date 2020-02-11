import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';

import {IVariableCategory} from '../../../autogen/IVariableCategory';
import {updateVariableCategoryMutation} from '../../graphql/mutations';
import {
    UpdateVariableCategoryMutation,
    UpdateVariableCategoryMutationVariables
} from '../../../autogen/UpdateVariableCategoryMutation';

import CreateEditCategoryForm from './CreateEditCategoryForm';

const EditVariableCategoryForm: FC<{variableCategory: IVariableCategory}> = ({variableCategory}) => {
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
    const disabled = JSON.stringify(originalValues) === JSON.stringify(updatedValues);

    return (
        <CreateEditCategoryForm
            amount={updatedAmount}
            disabled={disabled}
            headerText={'Edit Variable Category'}
            name={updatedName}
            onPress={updateVariableCategory}
            setAmount={setUpdatedAmount}
            setName={setUpdatedName}
        />
    );
};

export default EditVariableCategoryForm;
