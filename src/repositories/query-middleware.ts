import {QueryOptions} from 'apollo-client';
import {GraphQLError} from 'graphql';

import {getApolloClient} from '../graphql/apollo-client';

export interface IErrorResponse {
    errors: ReadonlyArray<GraphQLError>
    hasError: true
}

export interface IOkResponse<T> {
    data: T
    hasError: false
}

export type QueryResponse<T> = IOkResponse<T> | IErrorResponse;

export const queryGraphql = async <T, TVariables>(options: QueryOptions<TVariables>): Promise<QueryResponse<T>> => {
    const response = await getApolloClient().query({
        ...options,
        errorPolicy: 'all'
    });

    if (response.errors) {
        return {
            errors: response.errors,
            hasError: true
        };
    }

    return {
        data: response.data,
        hasError: false
    };
};
