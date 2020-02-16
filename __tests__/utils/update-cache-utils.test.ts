import {
    createRandomAppState,
    createRandomExpense,
    createRandomFixedCategories,
    createRandomFixedCategory,
    createRandomVariableCategories,
    createRandomVariableCategory
} from '../models';
import * as reduxStore from '../../src/redux/store';
import {
    createExpenseUpdate,
    createFixedCategoryUpdate,
    createVariableCategoryUpdate
} from '../../src/utils/update-cache-utils';
import {getExpensesQuery, getFixedCategoriesQuery, getVariableCategoriesQuery} from '../../src/graphql/queries';
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
                        expectedMutationResult.data.createVariableCategory
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

    describe('createExpenseUpdate', () => {
        let expectedReadQuery,
            expectedMutationResult,
            expectedState;

        beforeEach(() => {
            expectedMutationResult = {
                data: {
                    createExpense: createRandomExpense()
                }
            };
            expectedReadQuery = {
                expenses: createRandomFixedCategories()
            };
            expectedState = createRandomAppState();

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
                    ]
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
});
