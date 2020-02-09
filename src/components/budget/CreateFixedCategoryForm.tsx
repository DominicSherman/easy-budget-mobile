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

import CreateEditCategoryForm from './CreateEditCategoryForm';

const CreateFixedCategoryForm: FC = () => {
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

    return (
        <CreateEditCategoryForm
            amount={amount}
            headerText={'Create Fixed Category'}
            name={name}
            note={note}
            onPress={onPress}
            setAmount={setAmount}
            setName={setName}
            setNote={setNote}
            toggleable
        />
    );
};

export default CreateFixedCategoryForm;
