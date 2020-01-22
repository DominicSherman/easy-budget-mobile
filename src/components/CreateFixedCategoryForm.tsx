import React, {FC, useState} from 'react';
import uuid from 'uuid';
import {useMutation} from '@apollo/react-hooks';
import {useSelector} from 'react-redux';

import {createFixedCategoryMutation} from '../graphql/mutations';
import {getUserId} from '../services/auth-service';
import {IAppState} from '../redux/reducer';
import {
    CreateFixedCategoryMutation,
    CreateFixedCategoryMutationVariables
} from '../../autogen/CreateFixedCategoryMutation';
import {CreateFixedCategory} from '../../autogen/globalTypes';
import {createFixedCategoryUpdate} from '../utils/update-cache-utils';

import CreateCategoryForm from './CreateCategoryForm';

const CreateFixedCategoryForm: FC = () => {
    const timePeriodId = useSelector<IAppState, string>((state) => state.timePeriodId);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const fixedCategory: CreateFixedCategory = {
        amount: Number(amount),
        fixedCategoryId: uuid.v4(),
        name,
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
    };

    return (
        <CreateCategoryForm
            amount={amount}
            name={name}
            onPress={onPress}
            setAmount={setAmount}
            setName={setName}
        />
    );
};

export default CreateFixedCategoryForm;
