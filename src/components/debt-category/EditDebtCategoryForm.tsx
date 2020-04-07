import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {Alert} from 'react-native';

import {IDebtCategory} from '../../../autogen/IDebtCategory';
import {deleteDebtCategoryMutation, updateDebtCategoryMutation} from '../../graphql/mutations';
import {
    UpdateDebtCategoryMutation,
    UpdateDebtCategoryMutationVariables
} from '../../../autogen/UpdateDebtCategoryMutation';
import Form from '../generic/Form';
import {
    DeleteDebtCategoryMutation,
    DeleteDebtCategoryMutationVariables
} from '../../../autogen/DeleteDebtCategoryMutation';
import {deleteDebtCategoryUpdate} from '../../utils/update-cache-utils';
import {easeInTransition} from '../../services/animation-service';
import {Color} from '../../constants/color';

interface IEditDebtCategoryFormProps {
    toggleExpanded: () => void
    debtCategory: IDebtCategory
}

const EditDebtCategoryForm: FC<IEditDebtCategoryFormProps> = ({toggleExpanded, debtCategory}) => {
    const {name, debtCategoryId, userId} = debtCategory;
    const [updatedName, setUpdatedName] = useState(name);
    const originalValues = {
        name
    };
    const updatedValues = {
        name: updatedName
    };
    const [updateDebtCategory] = useMutation<UpdateDebtCategoryMutation, UpdateDebtCategoryMutationVariables>(updateDebtCategoryMutation, {
        optimisticResponse: {
            updateDebtCategory: {
                ...debtCategory,
                ...updatedValues
            }
        },
        variables: {
            debtCategory: {
                debtCategoryId,
                userId,
                ...updatedValues
            }
        }
    });
    const onPress = (): void => {
        updateDebtCategory();
        toggleExpanded();
    };
    const [deleteDebtCategory] = useMutation<DeleteDebtCategoryMutation, DeleteDebtCategoryMutationVariables>(deleteDebtCategoryMutation, {
        optimisticResponse: {
            deleteDebtCategory: debtCategoryId
        },
        update: deleteDebtCategoryUpdate,
        variables: {
            debtCategoryId,
            userId
        }
    });
    const onPressDelete = (): void => {
        Alert.alert(
            `Delete ${debtCategory.name}?`,
            '',
            [
                {text: 'Cancel'},
                {
                    onPress: (): void => {
                        easeInTransition();
                        deleteDebtCategory();
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
        wrapperStyle: {backgroundColor: Color.red}
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

export default EditDebtCategoryForm;
