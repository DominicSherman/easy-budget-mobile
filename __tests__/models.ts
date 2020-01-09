import {QueryResult} from '@apollo/react-common';
import {ApolloError, NetworkStatus} from 'apollo-client';

import {IVariableCategory} from '../autogen/IVariableCategory';
import {ITimePeriod} from '../autogen/ITimePeriod';
import {IAppState} from '../src/redux/reducer';

import {chance} from './chance';

export const createError = (): ApolloError => new ApolloError({
    errorMessage: chance.string(),
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    graphQLErrors: chance.n(chance.string, chance.d6()),
    networkError: new Error(chance.string())
});

export const createRandomVariableCategory = (variableCategory = {}): IVariableCategory => ({
    __typename: 'VariableCategory',
    amount: chance.natural(),
    name: chance.string(),
    timePeriodId: chance.guid(),
    userId: chance.string(),
    variableCategoryId: chance.guid(),
    ...variableCategory
});

export const createRandomVariableCategories = (): IVariableCategory[] => chance.n(createRandomVariableCategory, chance.d6());

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

export const createRandomAppState = (): IAppState => ({
    timePeriodId: chance.guid()
});
