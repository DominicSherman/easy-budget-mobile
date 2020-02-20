import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {useNavigation} from '@react-navigation/native';

import {IVariableCategory} from '../../../autogen/IVariableCategory';
import {updateVariableCategoryMutation} from '../../graphql/mutations';
import {
    UpdateVariableCategoryMutation,
    UpdateVariableCategoryMutationVariables
} from '../../../autogen/UpdateVariableCategoryMutation';

import CategoryForm from './CategoryForm';

const EditVariableCategoryForm: FC<{variableCategory: IVariableCategory}> = ({variableCategory}) => {
    const navigation = useNavigation();
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
        navigation.goBack();
    };
    const disabled = JSON.stringify(originalValues) === JSON.stringify(updatedValues);

    return (
        <CategoryForm
            amount={updatedAmount}
            disabled={disabled}
            headerText={'Edit Variable Category'}
            name={updatedName}
            onPress={onPress}
            setAmount={setUpdatedAmount}
            setName={setUpdatedName}
        />
    );
};

export default EditVariableCategoryForm;
