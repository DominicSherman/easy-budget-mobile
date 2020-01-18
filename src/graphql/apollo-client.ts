import ApolloClient from 'apollo-boost';

let apolloClient: ApolloClient<any>;

const LOCAL_HOST = 'http://localhost:5000/easy-budget-2f9aa/us-central1/graphql';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PROD = 'https://us-central1-easy-budget-2f9aa.cloudfunctions.net/graphql';

const initializeApolloClient = (): void => {
    apolloClient = new ApolloClient({
        uri: LOCAL_HOST
    });
};

export const getApolloClient = (): ApolloClient<any> => {
    if (!apolloClient) {
        initializeApolloClient();
    }

    return apolloClient;
};
