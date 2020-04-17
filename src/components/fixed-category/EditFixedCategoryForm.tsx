import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {Alert} from 'react-native';

import {IFixedCategory} from '../../../autogen/IFixedCategory';
import {deleteFixedCategoryMutation, updateFixedCategoryMutation} from '../../graphql/mutations';
import {
    UpdateFixedCategoryMutation,
    UpdateFixedCategoryMutationVariables
} from '../../../autogen/UpdateFixedCategoryMutation';
import Form from '../generic/Form';
import {
    DeleteFixedCategoryMutation,
    DeleteFixedCategoryMutationVariables
} from '../../../autogen/DeleteFixedCategoryMutation';
import {deleteFixedCategoryUpdate} from '../../utils/update-cache-utils';
import {easeInTransition} from '../../services/animation-service';
import {Color} from '../../constants/color';
import {IInputProps} from '../generic/Input';

interface IEditFixedCategoryFormProps {
    fixedCategory: IFixedCategory
    toggleExpanded: () => void
}

const EditFixedCategoryForm: FC<IEditFixedCategoryFormProps> = ({fixedCategory, toggleExpanded}) => {
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
        toggleExpanded();
    };
    const [deleteFixedCategory] = useMutation<DeleteFixedCategoryMutation, DeleteFixedCategoryMutationVariables>(deleteFixedCategoryMutation, {
        optimisticResponse: {
            deleteFixedCategory: fixedCategoryId
        },
        update: deleteFixedCategoryUpdate,
        variables: {
            fixedCategoryId,
            userId
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
    }, {
        onChange: setUpdatedNote,
        title: 'Note',
        value: updatedNote
    }];
    const buttons = [{
        onPress: onPressDelete,
        text: 'Delete',
        wrapperStyle: {backgroundColor: Color.peach}
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

export default EditFixedCategoryForm;
