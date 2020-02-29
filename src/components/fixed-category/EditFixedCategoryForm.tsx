import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';

import {IFixedCategory} from '../../../autogen/IFixedCategory';
import {updateFixedCategoryMutation} from '../../graphql/mutations';
import {
    UpdateFixedCategoryMutation,
    UpdateFixedCategoryMutationVariables
} from '../../../autogen/UpdateFixedCategoryMutation';
import CategoryForm from '../generic/CategoryForm';

interface IEditFixedCategoryFormProps {
    fixedCategory: IFixedCategory
    onUpdate?: () => void
}

const EditFixedCategoryForm: FC<IEditFixedCategoryFormProps> = ({fixedCategory, onUpdate}) => {
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

        if (onUpdate) {
            onUpdate();
        }
    };
    const disabled = JSON.stringify(originalValues) === JSON.stringify(updatedValues);

    return (
        <CategoryForm
            amount={updatedAmount}
            buttonText={'Update'}
            disabled={disabled}
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
