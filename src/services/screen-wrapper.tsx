import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import {Provider} from 'react-redux';

import {getApolloClient} from '../graphql/apollo-client';
import {getStore} from '../redux/store';

export const asScreen = (Component: React.FC): any =>
    class ScreenWrapper extends React.Component {
        render(): JSX.Element {
            return (
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                <ApolloProvider client={getApolloClient()}>
                    <Provider store={getStore()}>
                        <Component {...this.props} />
                    </Provider>
                </ApolloProvider>
            );
        }
    };
