import React, {FC} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {NetworkStatus} from 'apollo-client';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

import {getExpensesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {GetExpenses, GetExpensesVariables} from '../../autogen/GetExpenses';
import {sortByDate} from '../utils/sorting-utils';
import CreateExpenseForm from '../components/expense/CreateExpenseForm';
import ExpenseItem from '../components/expense/ExpenseItem';
import EmptyScreen from '../components/generic/EmptyScreen';
import {Route} from '../enums/Route';
import {useBudgetNavigation, useTimePeriodId} from '../utils/hooks';
import {ListFooterComponent} from '../components/generic/Generic';
import BrowsingHeader from '../components/time-period/BrowsingHeader';

import {InformationRef} from './Information';
import TimePeriods from './TimePeriods';

const Expenses: FC = () => {
    const navigation = useBudgetNavigation();
    const timePeriodId = useTimePeriodId();
    const queryResult = useQuery<GetExpenses, GetExpensesVariables>(getExpensesQuery, {
        notifyOnNetworkStatusChange: true,
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
            params: {}
        });
    };

    if (!timePeriodId) {
        return <TimePeriods />;
    }

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {refetch, networkStatus, data} = queryResult;
    const {expenses, variableCategories} = data;

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
    const getCategoryName = (variableCategoryId: string): string => variableCategories.find(
        (variableCategory) => variableCategory.variableCategoryId === variableCategoryId
    )?.name || '';

    return (
        <KeyboardAwareFlatList
            ListEmptyComponent={
                <EmptyScreen
                    onPressSubText={goToInformation}
                    subText={'What is an expense?'}
                    titleText={'You haven\'t created any expenses yet!'}
                />
            }
            ListFooterComponent={<ListFooterComponent />}
            ListHeaderComponent={
                <>
                    <BrowsingHeader />
                    <CreateExpenseForm />
                </>
            }
            ListHeaderComponentStyle={{zIndex: 1}}
            data={sortedExpenses}
            keyExtractor={(item): string => item.expenseId}
            onRefresh={refetch}
            refreshing={networkStatus === NetworkStatus.refetch}
            renderItem={({item, index}): JSX.Element =>
                <ExpenseItem
                    categoryName={getCategoryName(item.variableCategoryId)}
                    expense={item}
                    isLastItem={index === expenses.length - 1}
                />
            }
            showsVerticalScrollIndicator={false}
        />
    );
};

export default Expenses;
