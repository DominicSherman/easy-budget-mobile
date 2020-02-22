import React, {FC, useState} from 'react';
import uuid from 'uuid';
import {useMutation} from '@apollo/react-hooks';
import {useSelector} from 'react-redux';

import {createVariableCategoryMutation} from '../../graphql/mutations';
import {getUserId} from '../../services/auth-service';
import {
    CreateVariableCategoryMutation,
    CreateVariableCategoryMutationVariables
} from '../../../autogen/CreateVariableCategoryMutation';
import {createVariableCategoryUpdate} from '../../utils/update-cache-utils';
import {IAppState} from '../../redux/reducer';

import CategoryForm from '../generic/CategoryForm';

const CreateVariableCategoryForm: FC = () => {
    const timePeriodId = useSelector<IAppState, string>((state) => state.timePeriodId);
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

    return (
        <CategoryForm
            amount={amount}
            headerText={'Create Variable Category'}
            name={name}
            onPress={onPress}
            setAmount={setAmount}
            setName={setName}
            toggleable
        />
    );
};

export default CreateVariableCategoryForm;
