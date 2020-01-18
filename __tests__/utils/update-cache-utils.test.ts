import {createRandomAppState, createRandomVariableCategories, createRandomVariableCategory} from '../models';
import * as reduxStore from '../../src/redux/store';
import {createVariableCategoryUpdate} from '../../src/utils/update-cache-utils';
import {getVariableCategoriesQuery} from '../../src/graphql/queries';
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
    });
});
