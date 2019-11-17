import ApolloClient from 'apollo-boost';

let apolloClient: ApolloClient<unknown>;

const initializeApolloClient = (): void => {
    apolloClient = new ApolloClient({
        uri: 'http://localhost:5000/easy-budget-2f9aa/us-central1/api'
    });
};

export const getApolloClient = (): ApolloClient<unknown> => {
    if (!apolloClient) {
        initializeApolloClient();
    }

    return apolloClient;
};
