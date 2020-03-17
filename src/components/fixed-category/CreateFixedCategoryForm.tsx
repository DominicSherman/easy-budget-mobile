import React, {FC, useState} from 'react';
import uuid from 'uuid';
import {useMutation} from '@apollo/react-hooks';
import {useSelector} from 'react-redux';

import {createFixedCategoryMutation} from '../../graphql/mutations';
import {getUserId} from '../../services/auth-service';
import {IAppState} from '../../redux/reducer';
import {
    CreateFixedCategoryMutation,
    CreateFixedCategoryMutationVariables
} from '../../../autogen/CreateFixedCategoryMutation';
import {createFixedCategoryUpdate} from '../../utils/update-cache-utils';
import Form from '../generic/Form';

interface ICreateFixedCategoryFormProps {
    showCreateForm?: boolean
}

const CreateFixedCategoryForm: FC<ICreateFixedCategoryFormProps> = ({showCreateForm}) => {
    const timePeriodId = useSelector<IAppState, string>((state) => state.timePeriodId);
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
    const inputs = [{
        onChange: setName,
        title: 'Category Name *',
        value: name
    }, {
        onChange: setAmount,
        title: 'Category Amount *',
        value: amount
    }, {
        onChange: setNote,
        title: 'Note',
        value: note
    }];
    const buttons = [{
        disabled: !name.length || !amount.length,
        onPress,
        text: 'Create'
    }];

    return (
        <Form
            buttons={buttons}
            headerText={'Create Fixed Category'}
            inputs={inputs}
            toggleable
            visibleByDefault={showCreateForm}
        />
    );
};

export default CreateFixedCategoryForm;
