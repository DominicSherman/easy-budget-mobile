import React, {FC, useState} from 'react';
import {Picker, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useQuery} from '@apollo/react-hooks';

import {textStyles} from '../../styles/text-styles';
import DefaultText from '../generic/DefaultText';
import Button from '../generic/Button';
import Input from '../generic/Input';
import {IAppState} from '../../redux/reducer';
import {getExpensesQuery} from '../../graphql/queries';
import {getUserId} from '../../services/auth-service';
import {getEarlyReturn} from '../../services/error-and-loading-service';
import {GetExpenses, GetExpensesVariables} from '../../../autogen/GetExpenses';
import {sortByDate, sortByName} from '../../utils/sorting-utils';
import {SCREEN_WIDTH} from '../../constants/dimensions';

const CreateExpenseForm: FC = () => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const timePeriodId = useSelector<IAppState, string>((state) => state.timePeriodId);
    const queryResult = useQuery<GetExpenses, GetExpensesVariables>(getExpensesQuery, {
        variables: {
            timePeriodId,
            userId: getUserId()
        }
    });
    const onPress = () => {};

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {expenses, variableCategories} = queryResult.data;
    const sortedVariableCategories = variableCategories.sort(sortByName);
    const sortedExpenses = expenses.sort(sortByDate);

    if (!categoryId) {
        setCategoryId(sortedExpenses[0].variableCategoryId);
    }

    return (
        <View
            style={{
                alignItems: 'center',
                marginTop: 60,
                width: '100%'
            }}
        >
            <View style={{justifyContent: 'center'}}>
                <DefaultText style={textStyles.large}>{'Add Expense'}</DefaultText>
            </View>
            <Picker
                onValueChange={setCategoryId}
                selectedValue={categoryId}
                style={{
                    height: 180,
                    marginBottom: 32,
                    width: SCREEN_WIDTH
                }}
            >
                {
                    sortedVariableCategories.map((variableCategory) =>
                        <Picker.Item
                            key={variableCategory.variableCategoryId}
                            label={variableCategory.name}
                            value={variableCategory.variableCategoryId}
                        />
                    )
                }
            </Picker>
            <Input
                onChange={setName}
                title={'Expense Name'}
                value={name}
            />
            <Input
                keyboardType={'number-pad'}
                onChange={setAmount}
                title={'Expense Amount'}
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

export default CreateExpenseForm;
