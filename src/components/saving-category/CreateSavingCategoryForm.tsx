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
import CategoryForm from '../generic/CategoryForm';

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

    return (
        <CategoryForm
            buttonText={'Create'}
            headerText={'Create Saving Category'}
            name={name}
            onPress={onPress}
            setName={setName}
            toggleable
        />
    );
};

export default CreateSavingCategoryForm;
