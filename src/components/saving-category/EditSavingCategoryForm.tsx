import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {Alert} from 'react-native';

import {ISavingCategory} from '../../../autogen/ISavingCategory';
import {deleteSavingCategoryMutation, updateSavingCategoryMutation} from '../../graphql/mutations';
import {
    UpdateSavingCategoryMutation,
    UpdateSavingCategoryMutationVariables
} from '../../../autogen/UpdateSavingCategoryMutation';
import Form from '../generic/Form';
import {
    DeleteSavingCategoryMutation,
    DeleteSavingCategoryMutationVariables
} from '../../../autogen/DeleteSavingCategoryMutation';
import {deleteSavingCategoryUpdate} from '../../utils/update-cache-utils';
import {easeInTransition} from '../../services/animation-service';
import {Color} from '../../constants/color';

interface IEditSavingCategoryFormProps {
    toggleExpanded: () => void
    savingCategory: ISavingCategory
}

const EditSavingCategoryForm: FC<IEditSavingCategoryFormProps> = ({toggleExpanded, savingCategory}) => {
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
        toggleExpanded();
    };
    const [deleteSavingCategory] = useMutation<DeleteSavingCategoryMutation, DeleteSavingCategoryMutationVariables>(deleteSavingCategoryMutation, {
        optimisticResponse: {
            deleteSavingCategory: savingCategoryId
        },
        update: deleteSavingCategoryUpdate,
        variables: {
            savingCategoryId,
            userId
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
    const disabled = JSON.stringify(originalValues) === JSON.stringify(updatedValues) || !updatedName.length;
    const inputs = [{
        onChange: setUpdatedName,
        title: 'Category Name *',
        value: updatedName
    }];
    const buttons = [{
        onPress: onPressDelete,
        text: 'Delete',
        wrapperStyle: {
            backgroundColor: Color.peach
        }
    }, {
        disabled,
        onPress,
        text: 'Update',
        wrapperStyle: {
            backgroundColor: Color.brightGreen
        }
    }];

    return (
        <Form
            buttons={buttons}
            inputs={inputs}
        />
    );
};

export default EditSavingCategoryForm;
