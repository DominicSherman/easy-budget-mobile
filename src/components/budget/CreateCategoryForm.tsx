import React, {Dispatch, FC, SetStateAction} from 'react';
import {View} from 'react-native';

import {textStyles} from '../../styles/text-styles';
import DefaultText from '../generic/DefaultText';
import Button from '../generic/Button';
import Input from '../generic/Input';

interface ICreateCategoryFormProps {
    setName: Dispatch<SetStateAction<any>>
    name: string
    setAmount: Dispatch<SetStateAction<any>>
    amount: string
    onPress: () => void
}
const CreateCategoryForm: FC<ICreateCategoryFormProps> = ({
    setName,
    name,
    setAmount,
    amount,
    onPress
}) =>
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
    </View>;

export default CreateCategoryForm;
