import {QueryOptions} from 'apollo-client';
import {GraphQLError} from 'graphql';

import {getApolloClient} from '../graphql/apollo-client';

export interface IErrorResponse {
    error: GraphQLError
    hasError: true
}

export interface IOkResponse<T> {
    data: T
    hasError: false
}

export type QueryResponse<T> = IOkResponse<T> | IErrorResponse;

export const queryGraphql = async <T, TVariables>(options: QueryOptions<TVariables>): Promise<QueryResponse<T>> => {
    try {
        const response = await getApolloClient().query(options);

        return {
            data: response.data,
            hasError: false
        };
    } catch (error) {
        return {
            error,
            hasError: true
        };
    }
};
