import ApolloClient from 'apollo-boost';

export const apolloClient = new ApolloClient({
    uri: 'http://localhost:5000/easy-budget-2f9aa/us-central1/api'
});
