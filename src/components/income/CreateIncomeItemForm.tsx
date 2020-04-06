import React, {FC, useState} from 'react';
import uuid from 'uuid';
import {useMutation} from '@apollo/react-hooks';

import {createIncomeItemMutation} from '../../graphql/mutations';
import {getUserId} from '../../services/auth-service';
import {CreateIncomeItemMutation, CreateIncomeItemMutationVariables} from '../../../autogen/CreateIncomeItemMutation';
import {createIncomeItemUpdate} from '../../utils/update-cache-utils';
import Form, {IFormInput} from '../generic/Form';
import {useTimePeriodId} from '../../utils/hooks';

interface ICreateIncomeItemFormProps {
    showCreateForm?: boolean
}

const CreateIncomeItemForm: FC<ICreateIncomeItemFormProps> = ({showCreateForm}) => {
    const timePeriodId = useTimePeriodId();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [recurring, setRecurring] = useState(false);
    const incomeItem = {
        amount: Number(amount),
        incomeItemId: uuid.v4(),
        name,
        recurring,
        timePeriodId,
        userId: getUserId()
    };

    const [createIncomeItem] = useMutation<CreateIncomeItemMutation, CreateIncomeItemMutationVariables>(createIncomeItemMutation, {
        optimisticResponse: {
            createIncomeItem: {
                __typename: 'IncomeItem',
                ...incomeItem
            }
        },
        update: createIncomeItemUpdate,
        variables: {
            incomeItem
        }
    });
    const onPress = (): void => {
        createIncomeItem();
        setName('');
        setAmount('');
    };
    const inputs: IFormInput[] = [{
        onChange: setName,
        title: 'Category Name *',
        value: name
    }, {
        keyboardType: 'number-pad',
        onChange: setAmount,
        title: 'Category Amount *',
        value: amount
    }, {
        checked: recurring,
        isToggle: true,
        onChange: setRecurring,
        title: 'Recurring'
    }];
    const buttons = [{
        disabled: !name.length || !amount.length,
        onPress,
        text: 'Create'
    }];

    return (
        <Form
            buttons={buttons}
            headerText={'Create Income Item'}
            inputs={inputs}
            toggleable
            visibleByDefault={showCreateForm}
        />
    );
};

export default CreateIncomeItemForm;
