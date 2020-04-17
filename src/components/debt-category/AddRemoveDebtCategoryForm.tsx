import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';

import {IDebtCategory} from '../../../autogen/IDebtCategory';
import {updateDebtCategoryMutation} from '../../graphql/mutations';
import {
    UpdateDebtCategoryMutation,
    UpdateDebtCategoryMutationVariables
} from '../../../autogen/UpdateDebtCategoryMutation';
import Form from '../generic/Form';
import {Color} from '../../constants/color';
import {IInputProps} from '../generic/Input';
import {useThemedSelectedColor} from '../../utils/hooks';
import {Theme} from '../../services/theme-service';

export enum DebtUpdateType {
    ADD = 'Add',
    REMOVE = 'Remove'
}

interface IAddRemoveDebtCategoryFormProps {
    toggleExpanded: () => void
    debtCategory: IDebtCategory
    type: DebtUpdateType
}

const AddRemoveDebtCategoryForm: FC<IAddRemoveDebtCategoryFormProps> = ({toggleExpanded, debtCategory, type}) => {
    const {debtCategoryId, userId} = debtCategory;
    const [amount, setAmount] = useState<string>('');
    const updatedAmount = type === DebtUpdateType.ADD ? debtCategory.amount + Number(amount) : debtCategory.amount - Number(amount);
    const [updateDebtCategory] = useMutation<UpdateDebtCategoryMutation, UpdateDebtCategoryMutationVariables>(updateDebtCategoryMutation, {
        optimisticResponse: {
            updateDebtCategory: {
                ...debtCategory,
                amount: updatedAmount
            }
        },
        variables: {
            debtCategory: {
                amount: updatedAmount,
                debtCategoryId,
                userId
            }
        }
    });
    const onPress = (): void => {
        updateDebtCategory();
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
            backgroundColor: useThemedSelectedColor(Theme.LIGHT_BLUE)
        }
    }];

    return (
        <Form
            buttons={buttons}
            inputs={inputs}
        />
    );
};

export default AddRemoveDebtCategoryForm;
