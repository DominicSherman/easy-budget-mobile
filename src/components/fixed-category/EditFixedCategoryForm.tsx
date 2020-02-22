import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {useNavigation} from '@react-navigation/native';

import {IFixedCategory} from '../../../autogen/IFixedCategory';
import {updateFixedCategoryMutation} from '../../graphql/mutations';
import {
    UpdateFixedCategoryMutation,
    UpdateFixedCategoryMutationVariables
} from '../../../autogen/UpdateFixedCategoryMutation';

import CategoryForm from '../generic/CategoryForm';

const EditFixedCategoryForm: FC<{fixedCategory: IFixedCategory}> = ({fixedCategory}) => {
    const navigation = useNavigation();
    const {amount, name, note, fixedCategoryId, userId} = fixedCategory;
    const [updatedAmount, setUpdatedAmount] = useState(amount.toString());
    const [updatedName, setUpdatedName] = useState(name);
    const [updatedNote, setUpdatedNote] = useState(note);
    const originalValues = {
        amount,
        name,
        note
    };
    const updatedValues = {
        amount: Number(updatedAmount),
        name: updatedName,
        note: updatedNote
    };
    const [updateFixedCategory] = useMutation<UpdateFixedCategoryMutation, UpdateFixedCategoryMutationVariables>(updateFixedCategoryMutation, {
        optimisticResponse: {
            updateFixedCategory: {
                ...fixedCategory,
                ...updatedValues
            }
        },
        variables: {
            fixedCategory: {
                fixedCategoryId,
                userId,
                ...updatedValues
            }
        }
    });
    const onPress = (): void => {
        updateFixedCategory();
        navigation.goBack();
    };
    const disabled = JSON.stringify(originalValues) === JSON.stringify(updatedValues);

    return (
        <CategoryForm
            amount={updatedAmount}
            disabled={disabled}
            headerText={'Edit Fixed Category'}
            name={updatedName}
            note={updatedNote}
            onPress={onPress}
            setAmount={setUpdatedAmount}
            setName={setUpdatedName}
            setNote={setUpdatedNote}
        />
    );
};

export default EditFixedCategoryForm;
