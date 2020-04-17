import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';

import {ISavingCategory} from '../../../autogen/ISavingCategory';
import {updateSavingCategoryMutation} from '../../graphql/mutations';
import {
    UpdateSavingCategoryMutation,
    UpdateSavingCategoryMutationVariables
} from '../../../autogen/UpdateSavingCategoryMutation';
import Form from '../generic/Form';
import {Color} from '../../constants/color';
import {IInputProps} from '../generic/Input';

export enum SavingUpdateType {
    ADD = 'Add',
    REMOVE = 'Remove'
}

interface IAddRemoveSavingCategoryFormProps {
    toggleExpanded: () => void
    savingCategory: ISavingCategory
    type: SavingUpdateType
}

const AddRemoveSavingCategoryForm: FC<IAddRemoveSavingCategoryFormProps> = ({toggleExpanded, savingCategory, type}) => {
    const {savingCategoryId, userId} = savingCategory;
    const [amount, setAmount] = useState<string>('');
    const updatedAmount = type === SavingUpdateType.ADD ? savingCategory.amount + Number(amount) : savingCategory.amount - Number(amount);
    const [updateSavingCategory] = useMutation<UpdateSavingCategoryMutation, UpdateSavingCategoryMutationVariables>(updateSavingCategoryMutation, {
        optimisticResponse: {
            updateSavingCategory: {
                ...savingCategory,
                amount: updatedAmount
            }
        },
        variables: {
            savingCategory: {
                amount: updatedAmount,
                savingCategoryId,
                userId
            }
        }
    });
    const onPress = (): void => {
        updateSavingCategory();
        toggleExpanded();
    };
    const inputs: IInputProps[] = [{
        keyboardType: 'number-pad',
        onChange: setAmount,
        title: `${type} Amount`,
        value: amount
    }];
    const buttons = [{
        onPress: toggleExpanded,
        text: 'Cancel',
        wrapperStyle: {backgroundColor: Color.peach}
    }, {
        disabled: !amount,
        onPress,
        text: type,
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

export default AddRemoveSavingCategoryForm;
