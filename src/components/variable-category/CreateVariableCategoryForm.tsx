import React, {FC, useState} from 'react';
import uuid from 'uuid';
import {useMutation} from '@apollo/react-hooks';

import {createVariableCategoryMutation} from '../../graphql/mutations';
import {getUserId} from '../../services/auth-service';
import {
    CreateVariableCategoryMutation,
    CreateVariableCategoryMutationVariables
} from '../../../autogen/CreateVariableCategoryMutation';
import {createVariableCategoryUpdate} from '../../utils/update-cache-utils';
import Form from '../generic/Form';
import {IInputProps} from '../generic/Input';
import {useTimePeriodId} from '../../utils/hooks';

interface ICreateVariableCategoryFormProps {
    showCreateForm?: boolean
}

const CreateVariableCategoryForm: FC<ICreateVariableCategoryFormProps> = ({showCreateForm}) => {
    const timePeriodId = useTimePeriodId();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const variableCategory = {
        amount: Number(amount),
        name,
        timePeriodId,
        userId: getUserId(),
        variableCategoryId: uuid.v4()
    };

    const [createVariableCategory] = useMutation<CreateVariableCategoryMutation, CreateVariableCategoryMutationVariables>(createVariableCategoryMutation, {
        optimisticResponse: {
            createVariableCategory: {
                __typename: 'VariableCategory',
                ...variableCategory
            }
        },
        update: createVariableCategoryUpdate,
        variables: {
            variableCategory
        }
    });
    const onPress = (): void => {
        createVariableCategory();
        setName('');
        setAmount('');
    };
    const inputs: IInputProps[] = [{
        onChange: setName,
        title: 'Name *',
        value: name
    }, {
        keyboardType: 'number-pad',
        onChange: setAmount,
        title: 'Amount *',
        value: amount
    }];
    const buttons = [{
        disabled: !name.length || !amount.length,
        onPress,
        text: 'Create'
    }];

    return (
        <Form
            buttons={buttons}
            headerText={'Create Variable Category'}
            inputs={inputs}
            toggleable
            visibleByDefault={showCreateForm}
        />
    );
};

export default CreateVariableCategoryForm;
