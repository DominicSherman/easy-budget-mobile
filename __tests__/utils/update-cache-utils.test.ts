import {
    createRandomDebtCategories,
    createRandomDebtCategory,
    createRandomExpense,
    createRandomExpenses,
    createRandomFixedCategories,
    createRandomFixedCategory,
    createRandomIncomeItem,
    createRandomIncomeItems,
    createRandomSavingCategories,
    createRandomSavingCategory,
    createRandomTimePeriod,
    createRandomTimePeriods,
    createRandomVariableCategories,
    createRandomVariableCategory
} from '../models';
import * as reduxStore from '../../src/redux/store';
import {
    createDebtCategoryUpdate,
    createExpenseUpdate,
    createFixedCategoryUpdate,
    createIncomeItemUpdate,
    createSavingCategoryUpdate,
    createTimePeriodUpdate,
    createVariableCategoryUpdate,
    deleteDebtCategoryUpdate,
    deleteExpenseUpdate,
    deleteFixedCategoryUpdate,
    deleteIncomeItemUpdate,
    deleteSavingCategoryUpdate,
    deleteTimePeriodUpdate,
    deleteVariableCategoryUpdate
} from '../../src/utils/update-cache-utils';
import {
    getDebtCategoriesQuery,
    getExpensesQuery,
    getFixedCategoriesQuery,
    getIncomeItemsQuery,
    getSavingCategoriesQuery,
    getTimePeriodsQuery,
    getVariableCategoriesQuery
} from '../../src/graphql/queries';
import {getUserId} from '../../src/services/auth-service';
import {chance} from '../chance';

jest.mock('../../src/redux/store');
jest.mock('../../src/services/auth-service');

describe('update cache utils', () => {
    const {getTimePeriodId} = reduxStore as jest.Mocked<typeof reduxStore>;

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
            expectedTimePeriodId;

        beforeEach(() => {
            expectedMutationResult = {
                data: {
                    createVariableCategory: createRandomVariableCategory()
                }
            };
            expectedReadQuery = {
                variableCategories: createRandomVariableCategories()
            };
            expectedTimePeriodId = chance.guid();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getTimePeriodId.mockReturnValue(expectedTimePeriodId);
        });

        it('should call readQuery', () => {
            createVariableCategoryUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getVariableCategoriesQuery,
                variables: {
                    timePeriodId: expectedTimePeriodId,
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
                    timePeriodId: expectedTimePeriodId,
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
            expectedTimePeriodId;

        beforeEach(() => {
            expectedMutationResult = {
                data: {
                    createIncomeItem: createRandomIncomeItem()
                }
            };
            expectedReadQuery = {
                incomeItems: createRandomIncomeItems()
            };
            expectedTimePeriodId = chance.guid();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getTimePeriodId.mockReturnValue(expectedTimePeriodId);
        });

        it('should call readQuery', () => {
            createIncomeItemUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getIncomeItemsQuery,
                variables: {
                    timePeriodId: expectedTimePeriodId,
                    userId: getUserId()
                }
            });
        });

        it('should call write query if there is a result and data', () => {
            createIncomeItemUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).toHaveBeenCalledTimes(1);
            expect(cache.writeQuery).toHaveBeenCalledWith({
                data: {
                    incomeItems: [...expectedReadQuery.incomeItems, expectedMutationResult.data.createIncomeItem]
                },
                query: getIncomeItemsQuery,
                variables: {
                    timePeriodId: expectedTimePeriodId,
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
            expectedTimePeriodId;

        beforeEach(() => {
            expectedMutationResult = {
                data: {
                    createFixedCategory: createRandomFixedCategory()
                }
            };
            expectedReadQuery = {
                fixedCategories: createRandomFixedCategories()
            };
            expectedTimePeriodId = chance.guid();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getTimePeriodId.mockReturnValue(expectedTimePeriodId);
        });

        it('should call readQuery', () => {
            createFixedCategoryUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getFixedCategoriesQuery,
                variables: {
                    timePeriodId: expectedTimePeriodId,
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
                    timePeriodId: expectedTimePeriodId,
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
            expectedTimePeriodId;

        beforeEach(() => {
            expectedMutationResult = {
                data: {
                    createSavingCategory: createRandomSavingCategory()
                }
            };
            expectedReadQuery = {
                savingCategories: createRandomSavingCategories()
            };
            expectedTimePeriodId = chance.guid();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getTimePeriodId.mockReturnValue(expectedTimePeriodId);
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
            expectedTimePeriodId;

        beforeEach(() => {
            expectedMutationResult = {
                data: {
                    createDebtCategory: createRandomDebtCategory()
                }
            };
            expectedReadQuery = {
                debtCategories: createRandomDebtCategories()
            };
            expectedTimePeriodId = chance.guid();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getTimePeriodId.mockReturnValue(expectedTimePeriodId);
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
            expectedTimePeriodId;

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
            expectedTimePeriodId = chance.guid();

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
            getTimePeriodId.mockReturnValue(expectedTimePeriodId);
        });

        it('should call readQuery', () => {
            createExpenseUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getExpensesQuery,
                variables: {
                    timePeriodId: expectedTimePeriodId,
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
                    timePeriodId: expectedTimePeriodId,
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

    describe('createTimePeriodUpdate', () => {
        let expectedReadQuery,
            expectedMutationResult;

        beforeEach(() => {
            expectedMutationResult = {
                data: {
                    createTimePeriod: createRandomTimePeriod()
                }
            };
            expectedReadQuery = {
                timePeriods: createRandomTimePeriods()
            };

            cache.readQuery.mockReturnValue(expectedReadQuery);
        });

        it('should call readQuery', () => {
            createTimePeriodUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getTimePeriodsQuery,
                variables: {
                    userId: getUserId()
                }
            });
        });

        it('should call write query if there is a result and data', () => {
            createTimePeriodUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).toHaveBeenCalledTimes(1);
            expect(cache.writeQuery).toHaveBeenCalledWith({
                data: {
                    timePeriods: [...expectedReadQuery.timePeriods, expectedMutationResult.data.createTimePeriod]
                },
                query: getTimePeriodsQuery,
                variables: {
                    userId: getUserId()
                }
            });
        });

        it('should **not** call write query if there is not a result', () => {
            cache.readQuery.mockReturnValue(null);

            createTimePeriodUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });

        it('should **not** call write query if there is not data', () => {
            createTimePeriodUpdate(cache, {data: null});

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });
    });

    describe('deleteExpenseUpdate', () => {
        let expectedCategory,
            updatedVariableCategories,
            expectedReadQuery,
            expectedExpense,
            expectedMutationResult,
            expectedTimePeriodId;

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
            expectedTimePeriodId = chance.guid();

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
            getTimePeriodId.mockReturnValue(expectedTimePeriodId);
        });

        it('should call readQuery', () => {
            deleteExpenseUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getExpensesQuery,
                variables: {
                    timePeriodId: expectedTimePeriodId,
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
                    timePeriodId: expectedTimePeriodId,
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
            expectedTimePeriodId;

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
            expectedTimePeriodId = chance.guid();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getTimePeriodId.mockReturnValue(expectedTimePeriodId);
        });

        it('should call readQuery', () => {
            deleteFixedCategoryUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getFixedCategoriesQuery,
                variables: {
                    timePeriodId: expectedTimePeriodId,
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
                    timePeriodId: expectedTimePeriodId,
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
            expectedTimePeriodId;

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
            expectedTimePeriodId = chance.guid();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getTimePeriodId.mockReturnValue(expectedTimePeriodId);
        });

        it('should call readQuery', () => {
            deleteVariableCategoryUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getVariableCategoriesQuery,
                variables: {
                    timePeriodId: expectedTimePeriodId,
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
                    timePeriodId: expectedTimePeriodId,
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
            expectedTimePeriodId;

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
            expectedTimePeriodId = chance.guid();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getTimePeriodId.mockReturnValue(expectedTimePeriodId);
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
            expectedTimePeriodId;

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
            expectedTimePeriodId = chance.guid();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getTimePeriodId.mockReturnValue(expectedTimePeriodId);
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
            expectedTimePeriodId;

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
            expectedTimePeriodId = chance.guid();

            cache.readQuery.mockReturnValue(expectedReadQuery);
            getTimePeriodId.mockReturnValue(expectedTimePeriodId);
        });

        it('should call readQuery', () => {
            deleteIncomeItemUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getIncomeItemsQuery,
                variables: {
                    timePeriodId: expectedTimePeriodId,
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
                    timePeriodId: expectedTimePeriodId,
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

    describe('deleteTimePeriodUpdate', () => {
        let expectedReadQuery,
            expectedTimePeriod,
            expectedMutationResult;

        beforeEach(() => {
            expectedTimePeriod = createRandomTimePeriod();
            expectedMutationResult = {
                data: {
                    deleteTimePeriod: expectedTimePeriod.timePeriodId
                }
            };
            expectedReadQuery = {
                timePeriods: [...createRandomTimePeriods(), expectedTimePeriod]
            };

            cache.readQuery.mockReturnValue(expectedReadQuery);
        });

        it('should call readQuery', () => {
            deleteTimePeriodUpdate(cache, expectedMutationResult);

            expect(cache.readQuery).toHaveBeenCalledTimes(1);
            expect(cache.readQuery).toHaveBeenCalledWith({
                query: getTimePeriodsQuery,
                variables: {
                    userId: getUserId()
                }
            });
        });

        it('should call write query if there is a result and data', () => {
            deleteTimePeriodUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).toHaveBeenCalledTimes(1);
            expect(cache.writeQuery).toHaveBeenCalledWith({
                data: {
                    timePeriods: expectedReadQuery.timePeriods.filter((timePeriod) => timePeriod.timePeriodId !== expectedTimePeriod.timePeriodId)
                },
                query: getTimePeriodsQuery,
                variables: {
                    userId: getUserId()
                }
            });
        });

        it('should **not** call write query if there is not a result', () => {
            cache.readQuery.mockReturnValue(null);

            deleteTimePeriodUpdate(cache, expectedMutationResult);

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });

        it('should **not** call write query if there is not data', () => {
            deleteTimePeriodUpdate(cache, {data: null});

            expect(cache.writeQuery).not.toHaveBeenCalled();
        });
    });
});
