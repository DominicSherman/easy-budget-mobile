import React, {FC} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {useQuery} from '@apollo/react-hooks';
import {useNavigation} from '@react-navigation/native';

import {IAppState} from '../redux/reducer';
import {getExpensesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {GetExpenses, GetExpensesVariables} from '../../autogen/GetExpenses';
import {sortByDate} from '../utils/sorting-utils';
import CreateExpenseForm from '../components/expense/CreateExpenseForm';
import NoActiveTimePeriod from '../components/time-period/NoActiveTimePeriod';
import ExpenseItem from '../components/expense/ExpenseItem';
import EmptyScreen from '../components/generic/EmptyScreen';
import {Route} from '../enums/Route';

import {InformationRef} from './Information';

const Expenses: FC = () => {
    const navigation = useNavigation();
    const timePeriodId = useSelector<IAppState, string>((state) => state.timePeriodId);
    const queryResult = useQuery<GetExpenses, GetExpensesVariables>(getExpensesQuery, {
        skip: !timePeriodId,
        variables: {
            timePeriodId,
            userId: getUserId()
        }
    });
    const goToInformation = (): void => {
        navigation.navigate({
            name: Route.INFORMATION,
            params: {
                ref: InformationRef.EXPENSE
            }
        });
    };
    const goToVariableCategories = (): void => {
        navigation.navigate({
            name: Route.VARIABLE_CATEGORIES,
            params: undefined
        });
    };

    if (!timePeriodId) {
        return <NoActiveTimePeriod />;
    }

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {expenses, variableCategories} = queryResult.data;

    if (!variableCategories.length) {
        return (
            <EmptyScreen
                onPressSubText={goToVariableCategories}
                subText={'Create a variable category'}
                titleText={'You need to create a variable category first!'}
            />
        );
    }

    const sortedExpenses = expenses.sort(sortByDate);
    const getCategoryName = (variableCategoryId: string): string | undefined => variableCategories.find(
        (variableCategory) => variableCategory.variableCategoryId === variableCategoryId
    )?.name;

    return (
        <SafeAreaView>
            <FlatList
                ListEmptyComponent={
                    <EmptyScreen
                        onPressSubText={goToInformation}
                        subText={'What is an expense?'}
                        titleText={'You haven\'t created any expenses yet!'}
                    />
                }
                ListHeaderComponent={<CreateExpenseForm />}
                data={sortedExpenses}
                keyExtractor={(item): string => item.expenseId}
                renderItem={({item}): JSX.Element =>
                    <ExpenseItem
                        categoryName={getCategoryName(item.variableCategoryId)}
                        expense={item}
                    />
                }
            />
        </SafeAreaView>
    );
};

export default Expenses;
