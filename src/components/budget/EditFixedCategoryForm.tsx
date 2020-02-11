import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';

import {IFixedCategory} from '../../../autogen/IFixedCategory';
import {updateFixedCategoryMutation} from '../../graphql/mutations';
import {
    UpdateFixedCategoryMutation,
    UpdateFixedCategoryMutationVariables
} from '../../../autogen/UpdateFixedCategoryMutation';

import CreateEditCategoryForm from './CreateEditCategoryForm';

const EditFixedCategoryForm: FC<{fixedCategory: IFixedCategory}> = ({fixedCategory}) => {
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
    const disabled = JSON.stringify(originalValues) === JSON.stringify(updatedValues);

    return (
        <CreateEditCategoryForm
            amount={updatedAmount}
            disabled={disabled}
            headerText={'Edit Fixed Category'}
            name={updatedName}
            note={updatedNote}
            onPress={updateFixedCategory}
            setAmount={setUpdatedAmount}
            setName={setUpdatedName}
            setNote={setUpdatedNote}
        />
    );
};

export default EditFixedCategoryForm;