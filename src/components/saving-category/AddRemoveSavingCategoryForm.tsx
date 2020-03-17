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
import {getUserId} from '../../services/auth-service';
import {easeInTransition} from '../../services/animation-service';
import {Color} from '../../constants/color';

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
    const [amount, setAmount] = useState<number>(0);
    const updatedAmount = type === SavingUpdateType.ADD ? savingCategory.amount + amount : savingCategory.amount - amount;
    const [updateSavingCategory] = useMutation<UpdateSavingCategoryMutation, UpdateSavingCategoryMutationVariables>(updateSavingCategoryMutation, {
        optimisticResponse: {
            updateSavingCategory: {
                ...savingCategory,
                amount: updatedAmount
            }
        },
        variables: {
            savingCategory: {
                savingCategoryId,
                userId,
                amount: updatedAmount
            }
        }
    });
    const onPress = (): void => {
        updateSavingCategory();
        toggleExpanded();
    };
    const inputs = [{
        keyboardType: 'number-pad',
        onChange: setAmount,
        title: `${type} Amount`,
        value: amount
    }];
    const buttons = [{
        onPress: toggleExpanded,
        text: 'Cancel',
        wrapperStyle: {backgroundColor: Color.red}
    }, {
        onPress,
        text: type
    }];

    return (
        <Form
            buttons={buttons}
            inputs={inputs}
        />
    );
};

export default AddRemoveSavingCategoryForm;
