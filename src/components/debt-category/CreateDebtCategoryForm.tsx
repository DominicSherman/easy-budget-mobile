import React, {FC, useState} from 'react';
import uuid from 'uuid';
import {useMutation} from '@apollo/react-hooks';

import {createDebtCategoryMutation} from '../../graphql/mutations';
import {getUserId} from '../../services/auth-service';
import {
    CreateDebtCategoryMutation,
    CreateDebtCategoryMutationVariables
} from '../../../autogen/CreateDebtCategoryMutation';
import {createDebtCategoryUpdate} from '../../utils/update-cache-utils';
import Form from '../generic/Form';

const CreateDebtCategoryForm: FC<{showCreateForm?: boolean}> = ({showCreateForm}) => {
    const [name, setName] = useState('');
    const debtCategory = {
        debtCategoryId: uuid.v4(),
        name,
        userId: getUserId()
    };

    const [createDebtCategory] = useMutation<CreateDebtCategoryMutation, CreateDebtCategoryMutationVariables>(createDebtCategoryMutation, {
        optimisticResponse: {
            createDebtCategory: {
                __typename: 'DebtCategory',
                ...debtCategory
            }
        },
        update: createDebtCategoryUpdate,
        variables: {
            debtCategory
        }
    });
    const onPress = (): void => {
        createDebtCategory();
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
            headerText={'Create Debt Category'}
            inputs={inputs}
            toggleable
            visibleByDefault={showCreateForm}
        />
    );
};

export default CreateDebtCategoryForm;
