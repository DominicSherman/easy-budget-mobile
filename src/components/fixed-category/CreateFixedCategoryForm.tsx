import React, {FC, useState} from 'react';
import uuid from 'uuid';
import {useMutation} from '@apollo/react-hooks';

import {createFixedCategoryMutation} from '../../graphql/mutations';
import {getUserId} from '../../services/auth-service';
import {
    CreateFixedCategoryMutation,
    CreateFixedCategoryMutationVariables
} from '../../../autogen/CreateFixedCategoryMutation';
import {createFixedCategoryUpdate} from '../../utils/update-cache-utils';
import Form from '../generic/Form';
import {IInputProps} from '../generic/Input';
import {useThemedSelectedColor, useTimePeriodId} from '../../utils/hooks';
import {Theme} from '../../services/theme-service';

interface ICreateFixedCategoryFormProps {
    showCreateForm?: boolean
}

const CreateFixedCategoryForm: FC<ICreateFixedCategoryFormProps> = ({showCreateForm}) => {
    const timePeriodId = useTimePeriodId();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const fixedCategory = {
        amount: Number(amount),
        fixedCategoryId: uuid.v4(),
        name,
        note,
        paid: false,
        timePeriodId,
        userId: getUserId()
    };

    const [createFixedCategory] = useMutation<CreateFixedCategoryMutation, CreateFixedCategoryMutationVariables>(createFixedCategoryMutation, {
        optimisticResponse: {
            createFixedCategory: {
                __typename: 'FixedCategory',
                ...fixedCategory
            }
        },
        update: createFixedCategoryUpdate,
        variables: {
            fixedCategory
        }
    });
    const onPress = (): void => {
        createFixedCategory();
        setName('');
        setAmount('');
        setNote('');
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
    }, {
        onChange: setNote,
        title: 'Note',
        value: note
    }];
    const buttons = [{
        disabled: !name.length || !amount.length,
        onPress,
        text: 'Create',
        wrapperStyle: {
            backgroundColor: useThemedSelectedColor(Theme.RED)
        }
    }];

    return (
        <Form
            buttons={buttons}
            headerText={'Create Fixed Category'}
            inputs={inputs}
            theme={Theme.RED}
            toggleable
            visibleByDefault={showCreateForm}
        />
    );
};

export default CreateFixedCategoryForm;
