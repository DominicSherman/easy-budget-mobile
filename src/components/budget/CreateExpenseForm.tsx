import React, {FC, useState} from 'react';
import {Picker, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useMutation, useQuery} from '@apollo/react-hooks';
import uuid from 'uuid';
import moment from 'moment';

import {textStyles} from '../../styles/text-styles';
import {RegularText} from '../generic/Text';
import Button from '../generic/Button';
import Input from '../generic/Input';
import {IAppState} from '../../redux/reducer';
import {getExpensesQuery} from '../../graphql/queries';
import {getUserId} from '../../services/auth-service';
import {GetExpenses, GetExpensesVariables} from '../../../autogen/GetExpenses';
import {sortByDate, sortByName} from '../../utils/sorting-utils';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {createExpenseMutation} from '../../graphql/mutations';
import {CreateExpenseMutation, CreateExpenseMutationVariables} from '../../../autogen/CreateExpenseMutation';
import {createExpenseUpdate} from '../../utils/update-cache-utils';

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
    const expense = {
        amount: Number(amount),
        date: moment().toISOString(),
        expenseId: uuid.v4(),
        name,
        timePeriodId,
        userId: getUserId(),
        variableCategoryId: categoryId || ''
    };
    const [createExpense] = useMutation<CreateExpenseMutation, CreateExpenseMutationVariables>(createExpenseMutation, {
        optimisticResponse: {
            createExpense: {
                __typename: 'Expense',
                ...expense
            }
        },
        update: createExpenseUpdate,
        variables: {
            expense
        }
    });
    const onPress = (): void => {
        createExpense();
        setName('');
        setAmount('');
    };

    if (!queryResult.data) {
        return null;
    }

    const {expenses, variableCategories} = queryResult.data;
    const sortedVariableCategories = variableCategories.sort(sortByName);
    const sortedExpenses = expenses.sort(sortByDate);
    const mostRecentExpense = sortedExpenses[0];

    if (!categoryId && mostRecentExpense) {
        setCategoryId(mostRecentExpense.variableCategoryId);
    }

    return (
        <View
            style={{
                alignItems: 'center',
                marginVertical: 8,
                width: '100%'
            }}
        >
            <View style={{justifyContent: 'center'}}>
                <RegularText style={textStyles.large}>{'Add Expense'}</RegularText>
            </View>
            <Picker
                onValueChange={(value): void => setCategoryId(value)}
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
                keyboardType={'number-pad'}
                onChange={setAmount}
                title={'Expense Amount *'}
                value={amount}
            />
            <Input
                onChange={setName}
                title={'Expense Name'}
                value={name}
            />
            <Button
                disabled={!categoryId || amount === ''}
                onPress={onPress}
                text={'Submit'}
                wrapperStyle={{marginTop: 16}}
            />
        </View>
    );
};

export default CreateExpenseForm;
