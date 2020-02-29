import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {Alert} from 'react-native';

import {IFixedCategory} from '../../../autogen/IFixedCategory';
import {deleteFixedCategoryMutation, updateFixedCategoryMutation} from '../../graphql/mutations';
import {
    UpdateFixedCategoryMutation,
    UpdateFixedCategoryMutationVariables
} from '../../../autogen/UpdateFixedCategoryMutation';
import CategoryForm from '../generic/CategoryForm';
import {
    DeleteFixedCategoryMutation,
    DeleteFixedCategoryMutationVariables
} from '../../../autogen/DeleteFixedCategoryMutation';
import {deleteFixedCategoryUpdate} from '../../utils/update-cache-utils';
import {getUserId} from '../../services/auth-service';
import {easeInTransition} from '../../services/animation-service';

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
        Alert.alert(
            `Delete ${fixedCategory.name}?`,
            '',
            [
                {text: 'Cancel'},
                {
                    onPress: (): void => {
                        easeInTransition();
                        deleteFixedCategory();
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
            note={updatedNote}
            onPress={onPress}
            secondButtonText={'Delete'}
            secondOnPress={onPressDelete}
            setAmount={setUpdatedAmount}
            setName={setUpdatedName}
            setNote={setUpdatedNote}
        />
    );
};

export default EditFixedCategoryForm;
