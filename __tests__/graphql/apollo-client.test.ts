import ApolloClient from 'apollo-boost';

import {getApolloClient} from '../../src/graphql/apollo-client';

jest.mock('apollo-boost');

describe('Apollo Client', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return the apollo client if it has not been initialized', () => {
        getApolloClient();

        expect(ApolloClient).toHaveBeenCalledTimes(1);
        expect(ApolloClient).toHaveBeenCalledWith({
            uri: 'http://localhost:5000/easy-budget-2f9aa/us-central1/graphql'
        });
    });

    it('should return the apollo client if it has already been initialized', () => {
        getApolloClient();

        expect(ApolloClient).not.toHaveBeenCalled();
    });
});
