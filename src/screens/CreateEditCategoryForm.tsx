import React, {FC, useState} from 'react';
import {View} from 'react-native';
import uuid from 'uuid';
import {useMutation} from '@apollo/react-hooks';

import Input from '../components/generic/Input';
import Button from '../components/generic/Button';
import {createVariableCategoryMutation} from '../graphql/mutations';
import {getUserId} from '../services/auth-service';
import {textStyles} from '../styles/text-styles';
import DefaultText from '../components/generic/DefaultText';

const CreateEditCategoryForm: FC = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const [createVariableCategory] = useMutation(createVariableCategoryMutation, {
        onCompleted: () => {
            setName('');
            setAmount('');
        },
        variables: {
            variableCategory: {
                amount: Number(amount),
                name,
                userId: getUserId(),
                variableCategoryId: uuid.v4()
            }
        }
    });

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
                onPress={createVariableCategory}
                text={'Submit'}
                wrapperStyle={{marginTop: 16}}
            />
        </View>
    );
};

export default CreateEditCategoryForm;
