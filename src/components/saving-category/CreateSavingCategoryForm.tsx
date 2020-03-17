import React, {FC, useState} from 'react';
import uuid from 'uuid';
import {useMutation} from '@apollo/react-hooks';

import {createSavingCategoryMutation} from '../../graphql/mutations';
import {getUserId} from '../../services/auth-service';
import {
    CreateSavingCategoryMutation,
    CreateSavingCategoryMutationVariables
} from '../../../autogen/CreateSavingCategoryMutation';
import {createSavingCategoryUpdate} from '../../utils/update-cache-utils';
import Form from '../generic/Form';

const CreateSavingCategoryForm: FC = () => {
    const [name, setName] = useState('');
    const savingCategory = {
        name,
        savingCategoryId: uuid.v4(),
        userId: getUserId()
    };

    const [createSavingCategory] = useMutation<CreateSavingCategoryMutation, CreateSavingCategoryMutationVariables>(createSavingCategoryMutation, {
        optimisticResponse: {
            createSavingCategory: {
                __typename: 'SavingCategory',
                ...savingCategory
            }
        },
        update: createSavingCategoryUpdate,
        variables: {
            savingCategory
        }
    });
    const onPress = (): void => {
        createSavingCategory();
        setName('');
    };
    const inputs = [{
        onChange: setName,
        title: 'Category Name *',
        value: name
    }];
    const buttons = [{
        disabled: !name.length,
        onPress,
        text: 'Create'
    }];

    return (
        <Form
            buttons={buttons}
            headerText={'Create Saving Category'}
            inputs={inputs}
            toggleable
        />
    );
};

export default CreateSavingCategoryForm;
