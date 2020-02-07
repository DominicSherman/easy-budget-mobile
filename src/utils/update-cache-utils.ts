import {DataProxy} from 'apollo-cache';
import {FetchResult} from 'apollo-boost';

import {GetVariableCategories, GetVariableCategoriesVariables} from '../../autogen/GetVariableCategories';
import {getExpensesQuery, getFixedCategoriesQuery, getVariableCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {CreateVariableCategoryMutation} from '../../autogen/CreateVariableCategoryMutation';
import {getState} from '../redux/store';
import {CreateFixedCategoryMutation} from '../../autogen/CreateFixedCategoryMutation';
import {GetFixedCategories, GetFixedCategoriesVariables} from '../../autogen/GetFixedCategories';
import {CreateExpenseMutation} from '../../autogen/CreateExpenseMutation';
import {GetExpenses, GetExpensesVariables} from '../../autogen/GetExpenses';

export const createVariableCategoryUpdate = (cache: DataProxy, mutationResult: FetchResult<CreateVariableCategoryMutation>): void => {
    const query = getVariableCategoriesQuery;
    const variables = {
        timePeriodId: getState().timePeriodId,
        userId: getUserId()
    };
    const {data} = mutationResult;
    const result = cache.readQuery<GetVariableCategories, GetVariableCategoriesVariables>({
        query,
        variables
    });

    if (result && data) {
        const updatedVariableCategories = [...result.variableCategories, data.createVariableCategory];

        cache.writeQuery<GetVariableCategories, GetVariableCategoriesVariables>({
            data: {
                variableCategories: updatedVariableCategories
            },
            query,
            variables
        });
    }
};

export const createFixedCategoryUpdate = (cache: DataProxy, mutationResult: FetchResult<CreateFixedCategoryMutation>): void => {
    const query = getFixedCategoriesQuery;
    const variables = {
        timePeriodId: getState().timePeriodId,
        userId: getUserId()
    };
    const {data} = mutationResult;
    const result = cache.readQuery<GetFixedCategories, GetFixedCategoriesVariables>({
        query,
        variables
    });

    if (result && data) {
        const updatedFixedCategories = [...result.fixedCategories, data.createFixedCategory];

        cache.writeQuery<GetFixedCategories, GetFixedCategoriesVariables>({
            data: {
                fixedCategories: updatedFixedCategories
            },
            query,
            variables
        });
    }
};

export const createExpenseUpdate = (cache: DataProxy, mutationResult: FetchResult<CreateExpenseMutation>): void => {
    const query = getExpensesQuery;
    const variables = {
        timePeriodId: getState().timePeriodId,
        userId: getUserId()
    };
    const {data} = mutationResult;

    const result = cache.readQuery<GetExpenses, GetExpensesVariables>({
        query,
        variables
    });

    if (result && data) {
        const updatedExpenses = [...result.expenses, data.createExpense];
        const updatedCategory = result.variableCategories.find((variableCategory) => variableCategory.variableCategoryId === data.createExpense.variableCategoryId)!;
        const index = result.variableCategories.indexOf(updatedCategory);
        const updatedCategories = [
            ...result.variableCategories.slice(0, index),
            {
                ...updatedCategory,
                expenses: [
                    ...updatedCategory.expenses,
                    data.createExpense
                ]
            },
            ...result.variableCategories.slice(index + 1, result.variableCategories.length)
        ];

        cache.writeQuery<GetExpenses, GetExpensesVariables>({
            data: {
                expenses: updatedExpenses,
                variableCategories: updatedCategories
            },
            query,
            variables
        });
    }
};
