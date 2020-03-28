import {QueryResult} from '@apollo/react-common';
import {ApolloError, NetworkStatus} from 'apollo-client';
import {User} from '@react-native-community/google-signin';

import {IVariableCategory} from '../autogen/IVariableCategory';
import {ITimePeriod} from '../autogen/ITimePeriod';
import {IAppState} from '../src/redux/reducer';
import {IErrorResponse, IOkResponse} from '../src/repositories/query-middleware';
import {AppStatus} from '../src/enums/AppStatus';
import {IFixedCategory} from '../autogen/IFixedCategory';
import {IExpense} from '../autogen/IExpense';
import {Mode} from '../src/enums/Mode';

import {chance} from './chance';
import {ISavingCategory} from '../autogen/ISavingCategory';

export const createError = (): ApolloError => new ApolloError({
    errorMessage: chance.string(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLErrors: chance.n(chance.string, chance.d6()),
    networkError: new Error(chance.string())
});

export const createRandomExpense = (expense = {}): IExpense => ({
    __typename: 'Expense',
    amount: chance.natural(),
    date: chance.date().toISOString(),
    expenseId: chance.guid(),
    name: chance.string(),
    timePeriodId: chance.guid(),
    userId: chance.string(),
    variableCategoryId: chance.guid(),
    ...expense
});

export const createRandomVariableCategory = (variableCategory = {}): IVariableCategory => ({
    __typename: 'VariableCategory',
    amount: chance.natural(),
    expenses: chance.n(createRandomExpense, chance.d6()),
    name: chance.string(),
    timePeriodId: chance.guid(),
    userId: chance.string(),
    variableCategoryId: chance.guid(),
    ...variableCategory
});

export const createRandomVariableCategories = (): IVariableCategory[] => chance.n(createRandomVariableCategory, chance.d6());

export const createRandomFixedCategory = (fixedCategory = {}): IFixedCategory => ({
    __typename: 'FixedCategory',
    amount: chance.natural(),
    fixedCategoryId: chance.guid(),
    name: chance.string(),
    note: chance.string(),
    paid: chance.bool(),
    timePeriodId: chance.guid(),
    userId: chance.string(),
    ...fixedCategory
});

export const createRandomSavingCategory = (savingCategory = {}): ISavingCategory => ({
    __typename: 'SavingCategory',
    amount: chance.natural(),
    name: chance.string(),
    savingCategoryId: chance.guid(),
    userId: chance.string(),
    ...savingCategory
});

export const createRandomSavingCategories = (): ISavingCategory[] => chance.n(createRandomSavingCategory, chance.d6());

export const createRandomFixedCategories = (): IFixedCategory[] => chance.n(createRandomFixedCategory, chance.d6());

export const createRandomExpenses = (): IExpense[] => chance.n(createRandomExpense, chance.d6());

export const createRandomTimePeriod = (timePeriod = {}): ITimePeriod => ({
    __typename: 'TimePeriod',
    beginDate: chance.date().toISOString(),
    endDate: chance.date().toISOString(),
    timePeriodId: chance.guid(),
    userId: chance.string(),
    ...timePeriod
});

export const createRandomTimePeriods = (): ITimePeriod[] => chance.n(createRandomTimePeriod, chance.d6());

export const createRandomQueryResult = <TData = any>(data: TData): QueryResult<TData, any> => ({
    called: chance.bool(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    client: chance.string(),
    data,
    error: chance.pickone([createError(), undefined]),
    loading: chance.bool(),
    networkStatus: chance.pickone([
        NetworkStatus.error,
        NetworkStatus.loading,
        NetworkStatus.ready
    ])
});

export const createRandomErrorResponse = (): IErrorResponse => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    errors: chance.n(chance.string, chance.d6()),
    hasError: true
});

export const createRandomOkResponse = <TData>(data: TData): IOkResponse<TData> => ({
    data,
    hasError: false
});

export const createRandomUserInformation = (): User => ({
    idToken: chance.string(),
    serverAuthCode: chance.string(),
    user: {
        email: chance.string(),
        familyName: chance.string(),
        givenName: chance.string(),
        id: chance.string(),
        name: chance.string(),
        photo: chance.string()
    }
});

export const createRandomAppState = (): IAppState => ({
    appStatus: AppStatus.LOADING,
    mode: chance.pickone(Object.values(Mode)),
    timePeriodId: chance.guid(),
    userInformation: createRandomUserInformation()
});

export const createRouteProps = (props): any => ({
    route: {
        params: {
            ...props
        }
    }
});
