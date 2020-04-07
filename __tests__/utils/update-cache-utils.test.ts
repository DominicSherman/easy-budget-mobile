import {
    createRandomAppState, createRandomDebtCategories, createRandomDebtCategory,
    createRandomExpense,
    createRandomExpenses,
    createRandomFixedCategories,
    createRandomFixedCategory,
    createRandomIncomeItem,
    createRandomIncomeItems,
    createRandomSavingCategories,
    createRandomSavingCategory,
    createRandomVariableCategories,
    createRandomVariableCategory
} from '../models';
import * as reduxStore from '../../src/redux/store';
import {
    createDebtCategoryUpdate,
    createExpenseUpdate,
    createFixedCategoryUpdate, createIncomeItemUpdate,
    createSavingCategoryUpdate,
    createVariableCategoryUpdate, deleteDebtCategoryUpdate,
    deleteExpenseUpdate,
    deleteFixedCategoryUpdate,
    deleteIncomeItemUpdate,
    deleteSavingCategoryUpdate,
    deleteVariableCategoryUpdate
} from '../../src/utils/update-cache-utils';
import {
    getDebtCategoriesQuery,
    getExpensesQuery,
    getFixedCategoriesQuery, getIncomeItemsQuery,
    getSavingCategoriesQuery,
    getVariableCategoriesQuery
} from '../../src/graphql/queries';
import {getUserId} from '../../src/services/auth-service';

jest.mock('../../src/redux/store');
jest.mock('../../src/services/auth-service');

describe('update cache utils', () => {
    const {getState} = reduxStore as jest.Mocked<typeof reduxStore>;

    let cache;

    beforeEach(() => {
        cache = {
            readQuery: jest.fn(),
            writeQuery: jest.fn()
        };
    });

    describe('createVariableCategoryUpdate', () => {
        let expectedReadQuery,
            expectedMutationResult,
            expectedState;

        beforeEach(() => {
            expectedMutationResult = {
                data: {
                    createVariableCategory: createRandomVariableCategory()
                }
            };
            expectedReadQuery = {
                variableCategories: createRandomVariableCategories()
            };
            expectedState = createRandomAppState();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getState.mockReturnValue(expectedState);
        });

        it('should call readQuery', () => {
            createVariableCategoryUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getVariableCategoriesQuery,
                variables: {
                    timePeriodId: expectedState.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should call write query if there is a result and data', () => {
            createVariableCategoryUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).toHaveBeenCalledTimes(1);
            expect(cache.writeQuery).toHaveBeenCalledWith({
                data: {
                    variableCategories: [
                        ...expectedReadQuery.variableCategories,
                        {
                            ...expectedMutationResult.data.createVariableCategory,
                            expenses: []
                        }
                    ]
                },
                query: getVariableCategoriesQuery,
                variables: {
                    timePeriodId: expectedState.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should **not** call write query if there is not a result', () => {
            cache.readQuery.mockReturnValue(null);

            createVariableCategoryUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });

        it('should **not** call write query if there is not data', () => {
            createVariableCategoryUpdate(cache, {data: null});

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });
    });

    describe('createIncomeItemUpdate', () => {
        let expectedReadQuery,
            expectedMutationResult,
            expectedState;

        beforeEach(() => {
            expectedMutationResult = {
                data: {
                    createIncomeItem: createRandomIncomeItem()
                }
            };
            expectedReadQuery = {
                incomeItems: createRandomIncomeItems()
            };
            expectedState = createRandomAppState();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getState.mockReturnValue(expectedState);
        });

        it('should call readQuery', () => {
            createIncomeItemUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getIncomeItemsQuery,
                variables: {
                    timePeriodId: expectedState.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should call write query if there is a result and data', () => {
            createIncomeItemUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).toHaveBeenCalledTimes(1);
            expect(cache.writeQuery).toHaveBeenCalledWith({
                data: {
                    incomeItems: [
                        ...expectedReadQuery.incomeItems,
                        {
                            ...expectedMutationResult.data.createIncomeItem,
                            amount: 0
                        }
                    ]
                },
                query: getIncomeItemsQuery,
                variables: {
                    timePeriodId: expectedState.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should **not** call write query if there is not a result', () => {
            cache.readQuery.mockReturnValue(null);

            createIncomeItemUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });

        it('should **not** call write query if there is not data', () => {
            createIncomeItemUpdate(cache, {data: null});

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });
    });

    describe('createFixedCategoryUpdate', () => {
        let expectedReadQuery,
            expectedMutationResult,
            expectedState;

        beforeEach(() => {
            expectedMutationResult = {
                data: {
                    createFixedCategory: createRandomFixedCategory()
                }
            };
            expectedReadQuery = {
                fixedCategories: createRandomFixedCategories()
            };
            expectedState = createRandomAppState();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getState.mockReturnValue(expectedState);
        });

        it('should call readQuery', () => {
            createFixedCategoryUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getFixedCategoriesQuery,
                variables: {
                    timePeriodId: expectedState.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should call write query if there is a result and data', () => {
            createFixedCategoryUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).toHaveBeenCalledTimes(1);
            expect(cache.writeQuery).toHaveBeenCalledWith({
                data: {
                    fixedCategories: [
                        ...expectedReadQuery.fixedCategories,
                        expectedMutationResult.data.createFixedCategory
                    ]
                },
                query: getFixedCategoriesQuery,
                variables: {
                    timePeriodId: expectedState.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should **not** call write query if there is not a result', () => {
            cache.readQuery.mockReturnValue(null);

            createFixedCategoryUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });

        it('should **not** call write query if there is not data', () => {
            createFixedCategoryUpdate(cache, {data: null});

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });
    });

    describe('createSavingCategoryUpdate', () => {
        let expectedReadQuery,
            expectedMutationResult,
            expectedState;

        beforeEach(() => {
            expectedMutationResult = {
                data: {
                    createSavingCategory: createRandomSavingCategory()
                }
            };
            expectedReadQuery = {
                savingCategories: createRandomSavingCategories()
            };
            expectedState = createRandomAppState();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getState.mockReturnValue(expectedState);
        });

        it('should call readQuery', () => {
            createSavingCategoryUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getSavingCategoriesQuery,
                variables: {
                    userId: getUserId()
                }
            });
        });

        it('should call write query if there is a result and data', () => {
            createSavingCategoryUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).toHaveBeenCalledTimes(1);
            expect(cache.writeQuery).toHaveBeenCalledWith({
                data: {
                    savingCategories: [
                        ...expectedReadQuery.savingCategories,
                        {
                            ...expectedMutationResult.data.createSavingCategory,
                            amount: 0
                        }
                    ]
                },
                query: getSavingCategoriesQuery,
                variables: {
                    userId: getUserId()
                }
            });
        });

        it('should **not** call write query if there is not a result', () => {
            cache.readQuery.mockReturnValue(null);

            createSavingCategoryUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });

        it('should **not** call write query if there is not data', () => {
            createSavingCategoryUpdate(cache, {data: null});

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });
    });

    describe('createDebtCategoryUpdate', () => {
        let expectedReadQuery,
            expectedMutationResult,
            expectedState;

        beforeEach(() => {
            expectedMutationResult = {
                data: {
                    createDebtCategory: createRandomDebtCategory()
                }
            };
            expectedReadQuery = {
                debtCategories: createRandomDebtCategories()
            };
            expectedState = createRandomAppState();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getState.mockReturnValue(expectedState);
        });

        it('should call readQuery', () => {
            createDebtCategoryUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getDebtCategoriesQuery,
                variables: {
                    userId: getUserId()
                }
            });
        });

        it('should call write query if there is a result and data', () => {
            createDebtCategoryUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).toHaveBeenCalledTimes(1);
            expect(cache.writeQuery).toHaveBeenCalledWith({
                data: {
                    debtCategories: [
                        ...expectedReadQuery.debtCategories,
                        {
                            ...expectedMutationResult.data.createDebtCategory,
                            amount: 0
                        }
                    ]
                },
                query: getDebtCategoriesQuery,
                variables: {
                    userId: getUserId()
                }
            });
        });

        it('should **not** call write query if there is not a result', () => {
            cache.readQuery.mockReturnValue(null);

            createDebtCategoryUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });

        it('should **not** call write query if there is not data', () => {
            createDebtCategoryUpdate(cache, {data: null});

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });
    });

    describe('createExpenseUpdate', () => {
        let expectedCategory,
            updatedVariableCategories,
            expectedReadQuery,
            expectedMutationResult,
            expectedState;

        beforeEach(() => {
            expectedMutationResult = {
                data: {
                    createExpense: createRandomExpense()
                }
            };
            expectedCategory = createRandomVariableCategory({variableCategoryId: expectedMutationResult.data.createExpense.variableCategoryId});
            expectedReadQuery = {
                expenses: createRandomExpenses(),
                variableCategories: [...createRandomVariableCategories(), expectedCategory]
            };
            expectedState = createRandomAppState();

            const index = expectedReadQuery.variableCategories.indexOf(expectedCategory);
            const updatedCategory = {
                ...expectedCategory,
                expenses: [
                    ...expectedCategory.expenses,
                    expectedMutationResult.data.createExpense
                ]
            };

            updatedVariableCategories = [
                ...expectedReadQuery.variableCategories.slice(0, index),
                updatedCategory,
                ...expectedReadQuery.variableCategories.slice(index + 1, expectedReadQuery.variableCategories.length)
            ];

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getState.mockReturnValue(expectedState);
        });

        it('should call readQuery', () => {
            createExpenseUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getExpensesQuery,
                variables: {
                    timePeriodId: expectedState.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should call write query if there is a result and data', () => {
            createExpenseUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).toHaveBeenCalledTimes(1);
            expect(cache.writeQuery).toHaveBeenCalledWith({
                data: {
                    expenses: [
                        ...expectedReadQuery.expenses,
                        expectedMutationResult.data.createExpense
                    ],
                    variableCategories: updatedVariableCategories
                },
                query: getExpensesQuery,
                variables: {
                    timePeriodId: expectedState.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should **not** call write query if there is not a result', () => {
            cache.readQuery.mockReturnValue(null);

            createExpenseUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });

        it('should **not** call write query if there is not data', () => {
            createExpenseUpdate(cache, {data: null});

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });
    });

    describe('deleteExpenseUpdate', () => {
        let expectedCategory,
            updatedVariableCategories,
            expectedReadQuery,
            expectedExpense,
            expectedMutationResult,
            expectedState;

        beforeEach(() => {
            expectedExpense = createRandomExpense();
            expectedMutationResult = {
                data: {
                    deleteExpense: expectedExpense.expenseId
                }
            };
            expectedCategory = createRandomVariableCategory({variableCategoryId: expectedExpense.variableCategoryId});
            expectedReadQuery = {
                expenses: [...createRandomExpenses(), expectedExpense],
                variableCategories: [...createRandomVariableCategories(), expectedCategory]
            };
            expectedState = createRandomAppState();

            const index = expectedReadQuery.variableCategories.indexOf(expectedCategory);
            const updatedCategory = {
                ...expectedCategory,
                expenses: expectedCategory.expenses.filter((expense) => expense.expenseId !== expectedMutationResult.data.deleteExpense)
            };

            updatedVariableCategories = [
                ...expectedReadQuery.variableCategories.slice(0, index),
                updatedCategory,
                ...expectedReadQuery.variableCategories.slice(index + 1, expectedReadQuery.variableCategories.length)
            ];

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getState.mockReturnValue(expectedState);
        });

        it('should call readQuery', () => {
            deleteExpenseUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getExpensesQuery,
                variables: {
                    timePeriodId: expectedState.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should call write query if there is a result and data', () => {
            deleteExpenseUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).toHaveBeenCalledTimes(1);
            expect(cache.writeQuery).toHaveBeenCalledWith({
                data: {
                    expenses: expectedReadQuery.expenses.filter((expense) => expense.expenseId !== expectedExpense.expenseId),
                    variableCategories: updatedVariableCategories
                },
                query: getExpensesQuery,
                variables: {
                    timePeriodId: expectedState.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should **not** call write query if there is not a result', () => {
            cache.readQuery.mockReturnValue(null);

            deleteExpenseUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });

        it('should **not** call write query if there is not data', () => {
            deleteExpenseUpdate(cache, {data: null});

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });
    });

    describe('deleteFixedCategoryUpdate', () => {
        let expectedReadQuery,
            expectedFixedCategory,
            expectedMutationResult,
            expectedState;

        beforeEach(() => {
            expectedFixedCategory = createRandomFixedCategory();
            expectedMutationResult = {
                data: {
                    deleteFixedCategory: expectedFixedCategory.fixedCategoryId
                }
            };
            expectedReadQuery = {
                fixedCategories: [...createRandomFixedCategories(), expectedFixedCategory]
            };
            expectedState = createRandomAppState();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getState.mockReturnValue(expectedState);
        });

        it('should call readQuery', () => {
            deleteFixedCategoryUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getFixedCategoriesQuery,
                variables: {
                    timePeriodId: expectedState.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should call write query if there is a result and data', () => {
            deleteFixedCategoryUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).toHaveBeenCalledTimes(1);
            expect(cache.writeQuery).toHaveBeenCalledWith({
                data: {
                    fixedCategories: expectedReadQuery.fixedCategories.filter((fixedCategory) => fixedCategory.fixedCategoryId !== expectedFixedCategory.fixedCategoryId)
                },
                query: getFixedCategoriesQuery,
                variables: {
                    timePeriodId: expectedState.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should **not** call write query if there is not a result', () => {
            cache.readQuery.mockReturnValue(null);

            deleteFixedCategoryUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });

        it('should **not** call write query if there is not data', () => {
            deleteFixedCategoryUpdate(cache, {data: null});

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });
    });

    describe('deleteVariableCategoryUpdate', () => {
        let expectedReadQuery,
            expectedVariableCategory,
            expectedMutationResult,
            expectedState;

        beforeEach(() => {
            expectedVariableCategory = createRandomVariableCategory();
            expectedMutationResult = {
                data: {
                    deleteVariableCategory: expectedVariableCategory.variableCategoryId
                }
            };
            expectedReadQuery = {
                variableCategories: [...createRandomVariableCategories(), expectedVariableCategory]
            };
            expectedState = createRandomAppState();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getState.mockReturnValue(expectedState);
        });

        it('should call readQuery', () => {
            deleteVariableCategoryUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getVariableCategoriesQuery,
                variables: {
                    timePeriodId: expectedState.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should call write query if there is a result and data', () => {
            deleteVariableCategoryUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).toHaveBeenCalledTimes(1);
            expect(cache.writeQuery).toHaveBeenCalledWith({
                data: {
                    variableCategories: expectedReadQuery.variableCategories.filter((variableCategory) => variableCategory.variableCategoryId !== expectedVariableCategory.variableCategoryId)
                },
                query: getVariableCategoriesQuery,
                variables: {
                    timePeriodId: expectedState.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should **not** call write query if there is not a result', () => {
            cache.readQuery.mockReturnValue(null);

            deleteVariableCategoryUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });

        it('should **not** call write query if there is not data', () => {
            deleteVariableCategoryUpdate(cache, {data: null});

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });
    });

    describe('deleteSavingCategoryUpdate', () => {
        let expectedReadQuery,
            expectedSavingCategory,
            expectedMutationResult,
            expectedState;

        beforeEach(() => {
            expectedSavingCategory = createRandomSavingCategory();
            expectedMutationResult = {
                data: {
                    deleteSavingCategory: expectedSavingCategory.savingCategoryId
                }
            };
            expectedReadQuery = {
                savingCategories: [...createRandomSavingCategories(), expectedSavingCategory]
            };
            expectedState = createRandomAppState();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getState.mockReturnValue(expectedState);
        });

        it('should call readQuery', () => {
            deleteSavingCategoryUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getSavingCategoriesQuery,
                variables: {
                    userId: getUserId()
                }
            });
        });

        it('should call write query if there is a result and data', () => {
            deleteSavingCategoryUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).toHaveBeenCalledTimes(1);
            expect(cache.writeQuery).toHaveBeenCalledWith({
                data: {
                    savingCategories: expectedReadQuery.savingCategories.filter((savingCategory) => savingCategory.savingCategoryId !== expectedSavingCategory.savingCategoryId)
                },
                query: getSavingCategoriesQuery,
                variables: {
                    userId: getUserId()
                }
            });
        });

        it('should **not** call write query if there is not a result', () => {
            cache.readQuery.mockReturnValue(null);

            deleteSavingCategoryUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });

        it('should **not** call write query if there is not data', () => {
            deleteSavingCategoryUpdate(cache, {data: null});

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });
    });

    describe('deleteDebtCategoryUpdate', () => {
        let expectedReadQuery,
            expectedDebtCategory,
            expectedMutationResult,
            expectedState;

        beforeEach(() => {
            expectedDebtCategory = createRandomDebtCategory();
            expectedMutationResult = {
                data: {
                    deleteDebtCategory: expectedDebtCategory.debtCategoryId
                }
            };
            expectedReadQuery = {
                debtCategories: [...createRandomDebtCategories(), expectedDebtCategory]
            };
            expectedState = createRandomAppState();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getState.mockReturnValue(expectedState);
        });

        it('should call readQuery', () => {
            deleteDebtCategoryUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getDebtCategoriesQuery,
                variables: {
                    userId: getUserId()
                }
            });
        });

        it('should call write query if there is a result and data', () => {
            deleteDebtCategoryUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).toHaveBeenCalledTimes(1);
            expect(cache.writeQuery).toHaveBeenCalledWith({
                data: {
                    debtCategories: expectedReadQuery.debtCategories.filter((debtCategory) => debtCategory.debtCategoryId !== expectedDebtCategory.debtCategoryId)
                },
                query: getDebtCategoriesQuery,
                variables: {
                    userId: getUserId()
                }
            });
        });

        it('should **not** call write query if there is not a result', () => {
            cache.readQuery.mockReturnValue(null);

            deleteDebtCategoryUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });

        it('should **not** call write query if there is not data', () => {
            deleteDebtCategoryUpdate(cache, {data: null});

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });
    });

    describe('deleteIncomeItemUpdate', () => {
        let expectedReadQuery,
            expectedIncomeItem,
            expectedMutationResult,
            expectedState;

        beforeEach(() => {
            expectedIncomeItem = createRandomIncomeItem();
            expectedMutationResult = {
                data: {
                    deleteIncomeItem: expectedIncomeItem.incomeItemId
                }
            };
            expectedReadQuery = {
                incomeItems: [...createRandomIncomeItems(), expectedIncomeItem]
            };
            expectedState = createRandomAppState();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getState.mockReturnValue(expectedState);
        });

        it('should call readQuery', () => {
            deleteIncomeItemUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getIncomeItemsQuery,
                variables: {
                    timePeriodId: expectedState.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should call write query if there is a result and data', () => {
            deleteIncomeItemUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).toHaveBeenCalledTimes(1);
            expect(cache.writeQuery).toHaveBeenCalledWith({
                data: {
                    incomeItems: expectedReadQuery.incomeItems.filter((incomeItem) => incomeItem.incomeItemId !== expectedIncomeItem.incomeItemId)
                },
                query: getIncomeItemsQuery,
                variables: {
                    timePeriodId: expectedState.timePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should **not** call write query if there is not a result', () => {
            cache.readQuery.mockReturnValue(null);

            deleteIncomeItemUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });

        it('should **not** call write query if there is not data', () => {
            deleteIncomeItemUpdate(cache, {data: null});

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });
    });
});
