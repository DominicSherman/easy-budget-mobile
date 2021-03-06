import React, {FC, useState} from 'react';
import uuid from 'uuid';
import {useMutation} from '@apollo/react-hooks';

import {createIncomeItemMutation} from '../../graphql/mutations';
import {getUserId} from '../../services/auth-service';
import {CreateIncomeItemMutation, CreateIncomeItemMutationVariables} from '../../../autogen/CreateIncomeItemMutation';
import {createIncomeItemUpdate} from '../../utils/update-cache-utils';
import Form, {IFormInput, InputType} from '../generic/Form';
import {useThemedSelectedColor, useTimePeriodId} from '../../utils/hooks';
import {Theme} from '../../services/theme-service';

const CreateIncomeItemForm: FC = () => {
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
        title: 'Name *',
        value: name
    }, {
        keyboardType: 'number-pad',
        onChange: setAmount,
        title: 'Amount *',
        value: amount
    }, {
        checked: recurring,
        inputType: InputType.RECURRING_TOGGLE,
        onChange: setRecurring,
        title: 'recurring'
    }];
    const buttons = [{
        disabled: !name.length || !amount.length,
        onPress,
        text: 'Create',
        wrapperStyle: {
            backgroundColor: useThemedSelectedColor(Theme.GOLD)
        }
    }];

    return (
        <Form
            buttons={buttons}
            headerText={'Create Income Item'}
            inputs={inputs}
            theme={Theme.GOLD}
            toggleable
        />
    );
};

export default CreateIncomeItemForm;
