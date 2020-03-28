import {DataProxy} from 'apollo-cache';
import {FetchResult} from 'apollo-boost';

import {GetVariableCategories, GetVariableCategoriesVariables} from '../../autogen/GetVariableCategories';
import {
    getExpensesQuery,
    getFixedCategoriesQuery,
    getSavingCategoriesQuery,
    getVariableCategoriesQuery
} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {CreateVariableCategoryMutation} from '../../autogen/CreateVariableCategoryMutation';
import {getState} from '../redux/store';
import {CreateFixedCategoryMutation} from '../../autogen/CreateFixedCategoryMutation';
import {GetFixedCategories, GetFixedCategoriesVariables} from '../../autogen/GetFixedCategories';
import {CreateExpenseMutation} from '../../autogen/CreateExpenseMutation';
import {GetExpenses, GetExpensesVariables} from '../../autogen/GetExpenses';
import {DeleteExpenseMutation} from '../../autogen/DeleteExpenseMutation';
import {DeleteFixedCategoryMutation} from '../../autogen/DeleteFixedCategoryMutation';
import {DeleteVariableCategoryMutation} from '../../autogen/DeleteVariableCategoryMutation';
import {CreateSavingCategoryMutation} from '../../autogen/CreateSavingCategoryMutation';
import {GetSavingCategories, GetSavingCategoriesVariables} from '../../autogen/GetSavingCategories';
import {DeleteSavingCategoryMutation} from '../../autogen/DeleteSavingCategoryMutation';

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
        const updatedVariableCategories = [...result.variableCategories, {
            ...data.createVariableCategory,
            expenses: []
        }];

        cache.writeQuery<GetVariableCategories, GetVariableCategoriesVariables>({
            data: {
                variableCategories: updatedVariableCategories
            },
            query,
            variables
        });
    }
};

export const createSavingCategoryUpdate = (cache: DataProxy, mutationResult: FetchResult<CreateSavingCategoryMutation>): void => {
    const query = getSavingCategoriesQuery;
    const variables = {
        userId: getUserId()
    };
    const {data} = mutationResult;
    const result = cache.readQuery<GetSavingCategories, GetSavingCategoriesVariables>({
        query,
        variables
    });

    if (result && data) {
        const updatedSavingCategories = [...result.savingCategories, {
            ...data.createSavingCategory,
            amount: 0
        }];

        cache.writeQuery<GetSavingCategories, GetSavingCategoriesVariables>({
            data: {
                savingCategories: updatedSavingCategories
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const variableCategory = result.variableCategories.find((category) => category.variableCategoryId === data.createExpense.variableCategoryId)!;
        const index = result.variableCategories.indexOf(variableCategory);
        const updatedCategory = {
            ...variableCategory,
            expenses: [
                ...variableCategory.expenses,
                data.createExpense
            ]
        };
        const updatedCategories = [
            ...result.variableCategories.slice(0, index),
            updatedCategory,
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

export const deleteExpenseUpdate = (cache: DataProxy, mutationResult: FetchResult<DeleteExpenseMutation>): void => {
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
        const filterExpense = (expense): boolean => expense.expenseId !== data.deleteExpense;
        const updatedExpenses = result.expenses.filter(filterExpense);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const deletedExpense = result.expenses.find((expense) => expense.expenseId === data.deleteExpense)!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const variableCategory = result.variableCategories.find((category) => category.variableCategoryId === deletedExpense.variableCategoryId)!;
        const index = result.variableCategories.indexOf(variableCategory);
        const updatedCategory = {
            ...variableCategory,
            expenses: variableCategory.expenses.filter(filterExpense)
        };
        const updatedCategories = [
            ...result.variableCategories.slice(0, index),
            updatedCategory,
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

export const deleteFixedCategoryUpdate = (cache: DataProxy, mutationResult: FetchResult<DeleteFixedCategoryMutation>): void => {
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
        const updatedCategories = result.fixedCategories.filter((category) => category.fixedCategoryId !== data.deleteFixedCategory);

        cache.writeQuery<GetFixedCategories, GetFixedCategoriesVariables>({
            data: {
                fixedCategories: updatedCategories
            },
            query,
            variables
        });
    }
};

export const deleteVariableCategoryUpdate = (cache: DataProxy, mutationResult: FetchResult<DeleteVariableCategoryMutation>): void => {
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
        const updatedCategories = result.variableCategories.filter((category) => category.variableCategoryId !== data.deleteVariableCategory);

        cache.writeQuery<GetVariableCategories, GetVariableCategoriesVariables>({
            data: {
                variableCategories: updatedCategories
            },
            query,
            variables
        });
    }
};

export const deleteSavingCategoryUpdate = (cache: DataProxy, mutationResult: FetchResult<DeleteSavingCategoryMutation>): void => {
    const query = getSavingCategoriesQuery;
    const variables = {
        userId: getUserId()
    };
    const {data} = mutationResult;
    const result = cache.readQuery<GetSavingCategories, GetSavingCategoriesVariables>({
        query,
        variables
    });

    if (result && data) {
        const updatedCategories = result.savingCategories.filter((category) => category.savingCategoryId !== data.deleteSavingCategory);

        cache.writeQuery<GetSavingCategories, GetSavingCategoriesVariables>({
            data: {
                savingCategories: updatedCategories
            },
            query,
            variables
        });
    }
};
