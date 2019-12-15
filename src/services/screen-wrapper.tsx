import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';

import {getApolloClient} from '../graphql/apollo-client';

export const asScreen = (Component: React.FC): any =>
    class ScreenWrapper extends React.Component {
        render(): JSX.Element {
            return (
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                <ApolloProvider client={getApolloClient()}>
                    <Component {...this.props} />
                </ApolloProvider>
            );
        }
    };
