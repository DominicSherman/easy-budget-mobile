import {chance} from '../chance';
import * as apolloClient from '../../src/graphql/apollo-client';
import {queryGraphql} from '../../src/repositories/query-middleware';

jest.mock('../../src/graphql/apollo-client');

describe('query-middleware', () => {
    const {getApolloClient} = apolloClient as jest.Mocked<typeof apolloClient>;

    describe('queryGraphql', () => {
        let expectedClient: any,
            expectedOptions: any,
            expectedErrorResponse: any,
            expectedOkResponse: any;

        beforeEach(() => {
            expectedOkResponse = {
                data: chance.string()
            };
            expectedErrorResponse = {
                errors: chance.n(chance.string, chance.d6())
            };
            expectedClient = {
                query: jest.fn(() => expectedOkResponse)
            };
            expectedOptions = {
                [chance.string()]: chance.string()
            };

            getApolloClient.mockReturnValue(expectedClient);
        });

        it('should call query and pass the correct options', async () => {
            await queryGraphql(expectedOptions);

            expect(expectedClient.query).toHaveBeenCalledTimes(1);
            expect(expectedClient.query).toHaveBeenCalledWith({
                ...expectedOptions,
                errorPolicy: 'all'
            });
        });

        it('should return the correct response if the query response is ok', async () => {
            const actualResponse = await queryGraphql(expectedOptions);

            expect(actualResponse).toEqual({
                data: expectedOkResponse.data,
                hasError: false
            });
        });

        it('should return the correct response if the query response has errors', async () => {
            expectedClient.query.mockReturnValue(expectedErrorResponse);

            const actualResponse = await queryGraphql(expectedOptions);

            expect(actualResponse).toEqual({
                errors: expectedErrorResponse.errors,
                hasError: true
            });
        });
    });
});
