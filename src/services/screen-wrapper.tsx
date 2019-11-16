import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import {apolloClient} from '../graphql/apollo-client';

export const asScreen = (Component: React.FC) =>
  class ScreenWrapper extends React.Component {
    render() {
      return (
        <ApolloProvider client={apolloClient}>
          <Component {...this.props} />
        </ApolloProvider>
      );
    }
  };
