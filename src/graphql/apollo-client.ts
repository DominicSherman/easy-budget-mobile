import ApolloClient from 'apollo-client';
import {defaultDataIdFromObject, InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import {from, ApolloLink} from 'apollo-link';
import apolloLogger from 'apollo-link-logger';

let apolloClient: ApolloClient<any>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LOCAL_HOST = 'http://localhost:5000/easy-budget-2f9aa/us-central1/graphql';
const PROD = 'https://us-central1-easy-budget-2f9aa.cloudfunctions.net/graphql';

const cache = new InMemoryCache({
    dataIdFromObject: (object: {[key: string]: any}): string | null => {
        const type = object.__typename.charAt(0).toLowerCase() + object.__typename.slice(1);
        const value = object[`${type}Id`];

        if (value) {
            return `${object.__typename}:${value}`;
        }

        return defaultDataIdFromObject(object);
    }
});
const link = new HttpLink({
    uri: PROD
});

const initializeApolloClient = (): void => {
    apolloClient = new ApolloClient({
        cache,
        link: from([
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            new ApolloLink.from([apolloLogger]),
            link
        ])
    });
};

export const getApolloClient = (): ApolloClient<any> => {
    if (!apolloClient) {
        initializeApolloClient();
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return apolloClient;
};
