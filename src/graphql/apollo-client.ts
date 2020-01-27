import ApolloClient from 'apollo-boost';
import DefaultClient from 'apollo-client';

let apolloClient: ApolloClient<any>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LOCAL_HOST = 'http://localhost:5000/easy-budget-2f9aa/us-central1/graphql';
const PROD = 'https://us-central1-easy-budget-2f9aa.cloudfunctions.net/graphql';

const initializeApolloClient = (): void => {
    apolloClient = new ApolloClient({
        uri: LOCAL_HOST
    });
};

export const getApolloClient = (): DefaultClient<any> => {
    if (!apolloClient) {
        initializeApolloClient();
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return apolloClient;
};
