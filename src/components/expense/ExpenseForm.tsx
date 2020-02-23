import React, {Dispatch, FC, SetStateAction} from 'react';
import {Picker, StyleSheet, View} from 'react-native';

import {LargeText} from '../generic/Text';
import Button from '../generic/Button';
import Input from '../generic/Input';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {usePrimaryColor} from '../../redux/hooks';
import {IVariableCategory} from '../../../autogen/IVariableCategory';

const styles = StyleSheet.create({
    picker: {
        height: 180,
        marginBottom: 32,
        width: SCREEN_WIDTH
    },
    wrapper: {
        alignItems: 'center',
        marginVertical: 8,
        width: '100%'
    }
});

interface IExpenseFormProps {
    buttonText: string
    disabled?: boolean
    headerText: string
    amount: string
    setAmount: Dispatch<SetStateAction<any>>
    name: string | null
    setName: Dispatch<SetStateAction<any>>
    variableCategoryId: string | null
    setVariableCategoryId: Dispatch<SetStateAction<any>>
    onPress: () => void
    variableCategories: IVariableCategory[]
}

const ExpenseForm: FC<IExpenseFormProps> = (props) => {
    const {
        buttonText,
        headerText,
        amount,
        setAmount,
        name,
        setName,
        variableCategoryId,
        setVariableCategoryId,
        onPress,
        variableCategories
    } = props;
    const color = usePrimaryColor();

    return (
        <View style={styles.wrapper}>
            <View style={{justifyContent: 'center'}}>
                <LargeText>{headerText}</LargeText>
            </View>
            <Picker
                onValueChange={(value): void => setVariableCategoryId(value)}
                selectedValue={variableCategoryId}
                style={styles.picker}
            >
                {
                    variableCategories.map((variableCategory) =>
                        <Picker.Item
                            color={color}
                            key={variableCategory.variableCategoryId}
                            label={variableCategory.name}
                            value={variableCategory.variableCategoryId}
                        />
                    )
                }
            </Picker>
            <Input
                keyboardType={'number-pad'}
                onChange={setAmount}
                title={'Expense Amount *'}
                value={amount}
            />
            <Input
                onChange={setName}
                title={'Expense Description'}
                value={name}
            />
            <Button
                disabled={!variableCategoryId || amount === ''}
                onPress={onPress}
                text={buttonText}
                wrapperStyle={{marginTop: 16}}
            />
        </View>
    );
};

export default ExpenseForm;
