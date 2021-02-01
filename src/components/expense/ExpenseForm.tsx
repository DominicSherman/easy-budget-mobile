import React, {Dispatch, FC, SetStateAction} from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-community/picker';

import {LargeText} from '../generic/Text';
import Button from '../generic/Button';
import Input from '../generic/Input';
import {CARD_WIDTH, SCREEN_WIDTH} from '../../constants/dimensions';
import {usePrimaryColor} from '../../utils/hooks';
import {IVariableCategory} from '../../../autogen/IVariableCategory';
import CardView from '../generic/CardView';

const styles = StyleSheet.create({
    picker: {
        height: 180,
        marginBottom: 32,
        width: SCREEN_WIDTH
    },
    wrapper: {
        alignItems: 'center',
        marginTop: 16,
        width: '100%'
    }
});

interface IExpenseFormProps {
    amount: string
    buttonText: string
    disabled?: boolean
    headerText: string
    name: string | null
    onPress: () => void
    setAmount: Dispatch<SetStateAction<any>>
    setName: Dispatch<SetStateAction<any>>
    setVariableCategoryId: Dispatch<SetStateAction<any>>
    showCategoryPicker?: boolean
    variableCategories: IVariableCategory[]
    variableCategoryId: string | null
}

const ExpenseForm: FC<IExpenseFormProps> = (props) => {
    const {
        buttonText,
        headerText,
        amount,
        setAmount,
        name,
        showCategoryPicker,
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
            {
                showCategoryPicker &&
                    <Picker
                        onValueChange={(value): void => setVariableCategoryId(value)}
                        selectedValue={variableCategoryId || undefined}
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
            }
            <CardView
                disabled
                shadow
                style={{
                    flexDirection: 'column',
                    marginBottom: -8,
                    width: CARD_WIDTH
                }}
            >
                <Input
                    keyboardType={'numeric'}
                    onChange={setAmount}
                    title={'Amount *'}
                    value={amount}
                />
                <Input
                    onChange={setName}
                    title={'Description'}
                    value={name}
                />
                <Button
                    disabled={!variableCategoryId || amount === ''}
                    onPress={onPress}
                    text={buttonText}
                    wrapperStyle={{marginTop: 16}}
                />
            </CardView>
        </View>
    );
};

export default ExpenseForm;
