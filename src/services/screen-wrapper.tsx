import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';

import {getApolloClient} from '../graphql/apollo-client';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const asScreen = (Component: React.FC) =>
    class ScreenWrapper extends React.Component {
        render(): JSX.Element {
            return (
                <ApolloProvider client={getApolloClient()}>
                    <Component {...this.props} />
                </ApolloProvider>
            );
        }
    };
