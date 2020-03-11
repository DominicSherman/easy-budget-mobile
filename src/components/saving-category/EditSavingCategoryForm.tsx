import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {Alert} from 'react-native';

import {ISavingCategory} from '../../../autogen/ISavingCategory';
import {deleteSavingCategoryMutation, updateSavingCategoryMutation} from '../../graphql/mutations';
import {
    UpdateSavingCategoryMutation,
    UpdateSavingCategoryMutationVariables
} from '../../../autogen/UpdateSavingCategoryMutation';
import CategoryForm from '../generic/CategoryForm';
import {
    DeleteSavingCategoryMutation,
    DeleteSavingCategoryMutationVariables
} from '../../../autogen/DeleteSavingCategoryMutation';
import {deleteSavingCategoryUpdate} from '../../utils/update-cache-utils';
import {getUserId} from '../../services/auth-service';
import {easeInTransition} from '../../services/animation-service';

interface IEditSavingCategoryFormProps {
    onUpdate?: () => void
    savingCategory: ISavingCategory
}

const EditSavingCategoryForm: FC<IEditSavingCategoryFormProps> = ({onUpdate, savingCategory}) => {
    const {name, savingCategoryId, userId} = savingCategory;
    const [updatedName, setUpdatedName] = useState(name);
    const originalValues = {
        name
    };
    const updatedValues = {
        name: updatedName
    };
    const [updateSavingCategory] = useMutation<UpdateSavingCategoryMutation, UpdateSavingCategoryMutationVariables>(updateSavingCategoryMutation, {
        optimisticResponse: {
            updateSavingCategory: {
                ...savingCategory,
                ...updatedValues
            }
        },
        variables: {
            savingCategory: {
                savingCategoryId,
                userId,
                ...updatedValues
            }
        }
    });
    const onPress = (): void => {
        updateSavingCategory();

        if (onUpdate) {
            onUpdate();
        }
    };
    const [deleteSavingCategory] = useMutation<DeleteSavingCategoryMutation, DeleteSavingCategoryMutationVariables>(deleteSavingCategoryMutation, {
        optimisticResponse: {
            deleteSavingCategory: savingCategoryId
        },
        update: deleteSavingCategoryUpdate,
        variables: {
            savingCategoryId,
            userId: getUserId()
        }
    });
    const onPressDelete = (): void => {
        Alert.alert(
            `Delete ${savingCategory.name}?`,
            '',
            [
                {text: 'Cancel'},
                {
                    onPress: (): void => {
                        easeInTransition();
                        deleteSavingCategory();
                    },
                    text: 'Confirm'
                }
            ]
        );
    };
    const disabled = JSON.stringify(originalValues) === JSON.stringify(updatedValues);

    return (
        <CategoryForm
            buttonText={'Update'}
            disabled={disabled}
            name={updatedName}
            onPress={onPress}
            secondButtonText={'Delete'}
            secondOnPress={onPressDelete}
            setName={setUpdatedName}
        />
    );
};

export default EditSavingCategoryForm;
