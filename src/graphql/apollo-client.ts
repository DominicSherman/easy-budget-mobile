import ApolloClient from 'apollo-boost';

let apolloClient: ApolloClient<unknown>;

const LOCAL_HOST = 'http://localhost:5000/easy-budget-2f9aa/us-central1/graphql';
const PROD = 'https://us-central1-easy-budget-2f9aa.cloudfunctions.net/graphql';

const initializeApolloClient = (): void => {
    apolloClient = new ApolloClient({
        uri: LOCAL_HOST
    });
};

export const getApolloClient = (): ApolloClient<unknown> => {
    if (!apolloClient) {
        initializeApolloClient();
    }

    return apolloClient;
};
