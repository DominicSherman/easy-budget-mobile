import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {Alert} from 'react-native';

import {IIncomeItem} from '../../../autogen/IIncomeItem';
import {deleteIncomeItemMutation, updateIncomeItemMutation} from '../../graphql/mutations';
import {UpdateIncomeItemMutation, UpdateIncomeItemMutationVariables} from '../../../autogen/UpdateIncomeItemMutation';
import Form, {IFormInput, InputType} from '../generic/Form';
import {DeleteIncomeItemMutation, DeleteIncomeItemMutationVariables} from '../../../autogen/DeleteIncomeItemMutation';
import {deleteIncomeItemUpdate} from '../../utils/update-cache-utils';
import {easeInTransition} from '../../services/animation-service';
import {Color} from '../../constants/color';

interface IEditIncomeItemFormProps {
    toggleExpanded: () => void
    incomeItem: IIncomeItem
}

const EditIncomeItemForm: FC<IEditIncomeItemFormProps> = ({toggleExpanded, incomeItem}) => {
    const {amount, name, incomeItemId, recurring, userId} = incomeItem;
    const [updatedAmount, setUpdatedAmount] = useState(amount.toString());
    const [updatedName, setUpdatedName] = useState(name);
    const [updatedRecurring, setUpdatedRecurring] = useState(recurring);
    const originalValues = {
        amount,
        name,
        recurring
    };
    const updatedValues = {
        amount: Number(updatedAmount),
        name: updatedName,
        recurring: updatedRecurring
    };
    const [updateIncomeItem] = useMutation<UpdateIncomeItemMutation, UpdateIncomeItemMutationVariables>(updateIncomeItemMutation, {
        optimisticResponse: {
            updateIncomeItem: {
                ...incomeItem,
                ...updatedValues
            }
        },
        variables: {
            incomeItem: {
                incomeItemId,
                userId,
                ...updatedValues
            }
        }
    });
    const onPress = (): void => {
        updateIncomeItem();
        toggleExpanded();
    };
    const [deleteIncomeItem] = useMutation<DeleteIncomeItemMutation, DeleteIncomeItemMutationVariables>(deleteIncomeItemMutation, {
        optimisticResponse: {
            deleteIncomeItem: incomeItemId
        },
        update: deleteIncomeItemUpdate,
        variables: {
            incomeItemId,
            userId: incomeItem.userId
        }
    });
    const onPressDelete = (): void => {
        Alert.alert(
            `Delete ${incomeItem.name}?`,
            '',
            [
                {text: 'Cancel'},
                {
                    onPress: (): void => {
                        easeInTransition();
                        deleteIncomeItem();
                    },
                    text: 'Confirm'
                }
            ]
        );
    };
    const disabled = JSON.stringify(originalValues) === JSON.stringify(updatedValues) || !name.length || !updatedAmount.length;
    const inputs: IFormInput[] = [{
        onChange: setUpdatedName,
        title: 'Category Name *',
        value: updatedName
    }, {
        keyboardType: 'number-pad',
        onChange: setUpdatedAmount,
        title: 'Category Amount *',
        value: updatedAmount
    }, {
        checked: updatedRecurring,
        inputType: InputType.RECURRING_TOGGLE,
        onChange: setUpdatedRecurring,
        title: 'recurring'
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

export default EditIncomeItemForm;
