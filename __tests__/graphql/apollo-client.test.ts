import * as apolloClient from 'apollo-client';
import * as apolloLink from 'apollo-link';
import * as inMemoryCache from 'apollo-cache-inmemory';

import {getApolloClient, resetClient} from '../../src/graphql/apollo-client';
import {chance} from '../chance';

jest.mock('apollo-client');
jest.mock('apollo-link');
jest.mock('apollo-link-http');
jest.mock('apollo-link-logger');
jest.mock('apollo-cache-inmemory', () => ({
    defaultDataIdFromObject: jest.fn(),
    InMemoryCache: jest.fn()
}));

describe('Apollo Client', () => {
    const {from} = apolloLink as jest.Mocked<typeof apolloLink>;
    const {InMemoryCache, defaultDataIdFromObject} = inMemoryCache as jest.Mocked<typeof inMemoryCache>;
    const {ApolloClient} = apolloClient as jest.Mocked<typeof apolloClient>;

    beforeEach(() => {
        // @ts-ignore
        from.mockReturnValue(new apolloLink.ApolloLink({}));
    });

    afterEach(() => {
        resetClient();
    });

    it('should return the apollo client if it has not been initialized', () => {
        getApolloClient();

        expect(ApolloClient).toHaveBeenCalledTimes(1);
    });

    it('should create the cache', () => {
        getApolloClient();

        expect(InMemoryCache).toHaveBeenCalledTimes(1);
    });

    describe('cacheRedirects', () => {
        let args,
            getCacheKey,
            cacheRedirectsSpy;

        beforeEach(() => {
            getCacheKey = jest.fn();
            getApolloClient();
            // @ts-ignore
            cacheRedirectsSpy = InMemoryCache.mock.calls[0][0].cacheRedirects;
        });

        it('should redirect expense', () => {
            args = {
                expenseId: chance.guid()
            };

            cacheRedirectsSpy.Query.expense(null, args, {getCacheKey});

            expect(getCacheKey).toHaveBeenCalledTimes(1);
            expect(getCacheKey).toHaveBeenCalledWith({
                __typename: 'Expense',
                id: args.expenseId
            });
        });

        it('should redirect fixedCategory', () => {
            args = {
                fixedCategoryId: chance.guid()
            };

            cacheRedirectsSpy.Query.fixedCategory(null, args, {getCacheKey});

            expect(getCacheKey).toHaveBeenCalledTimes(1);
            expect(getCacheKey).toHaveBeenCalledWith({
                __typename: 'FixedCategory',
                id: args.fixedCategoryId
            });
        });

        it('should redirect variableCategory', () => {
            args = {
                variableCategoryId: chance.guid()
            };

            cacheRedirectsSpy.Query.variableCategory(null, args, {getCacheKey});

            expect(getCacheKey).toHaveBeenCalledTimes(1);
            expect(getCacheKey).toHaveBeenCalledWith({
                __typename: 'VariableCategory',
                id: args.variableCategoryId
            });
        });
    });

    describe('dataIdFromObject', () => {
        let expectedTypename,
            expectedValue,
            expectedObject,
            expectedDefault,
            dataIdSpy;

        beforeEach(() => {
            expectedTypename = chance.string().toLowerCase();
            expectedValue = chance.string();
            expectedObject = {
                [chance.string()]: chance.string(),
                __typename: expectedTypename,
                [`${expectedTypename}Id`]: expectedValue
            };
            expectedDefault = chance.string();

            getApolloClient();
            defaultDataIdFromObject.mockReturnValue(expectedDefault);
            // @ts-ignore
            dataIdSpy = InMemoryCache.mock.calls[0][0].dataIdFromObject;
        });

        it('should cache by id if possible', () => {
            const cacheValue = dataIdSpy(expectedObject);

            expect(cacheValue).toBe(`${expectedTypename}:${expectedValue}`);
        });

        it('should cache by default if not possible', () => {
            const cacheValue = dataIdSpy({
                ...expectedObject,
                __typename: chance.string()
            });

            expect(cacheValue).toBe(expectedDefault);
        });
    });

    it('should return the apollo client if it has already been initialized', () => {
        getApolloClient();

        ApolloClient.mockReset();

        getApolloClient();

        expect(ApolloClient).not.toHaveBeenCalled();
    });
});
