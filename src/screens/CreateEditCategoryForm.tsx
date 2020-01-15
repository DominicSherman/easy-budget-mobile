import React, {FC, useState} from 'react';
import {View} from 'react-native';
import uuid from 'uuid';
import {useMutation} from '@apollo/react-hooks';
import {useSelector} from 'react-redux';

import Input from '../components/generic/Input';
import Button from '../components/generic/Button';
import {createVariableCategoryMutation} from '../graphql/mutations';
import {getUserId} from '../services/auth-service';
import {textStyles} from '../styles/text-styles';
import DefaultText from '../components/generic/DefaultText';
import {
    CreateVariableCategoryMutation,
    CreateVariableCategoryMutationVariables
} from '../../autogen/CreateVariableCategoryMutation';
import {createVariableCategoryUpdate} from '../utils/update-cache-utils';
import {IAppState} from '../redux/reducer';

const CreateEditCategoryForm: FC = () => {
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
        <View
            style={{
                alignItems: 'center',
                marginTop: 60,
                width: '100%'
            }}
        >
            <View style={{justifyContent: 'center'}}>
                <DefaultText style={textStyles.large}>{'Add Category'}</DefaultText>
            </View>
            <Input
                onChange={setName}
                title={'Category Name'}
                value={name}
            />
            <Input
                keyboardType={'number-pad'}
                onChange={setAmount}
                title={'Category Amount'}
                value={amount}
            />
            <Button
                onPress={onPress}
                text={'Submit'}
                wrapperStyle={{marginTop: 16}}
            />
        </View>
    );
};

export default CreateEditCategoryForm;
