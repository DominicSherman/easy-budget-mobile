import React from 'react';
import {connect, Provider} from 'react-redux';

import {IAppState} from './reducer';
import {getStore} from './store';

const mapStateToProps = (state: IAppState): IAppState => state;

export const withRedux = (Component): any => class ReduxComponent extends React.Component {
    render(): any {
        const ConnectedComponent = connect(mapStateToProps)(Component);

        return (
            <Provider store={getStore()}>
                <ConnectedComponent {...this.props} />
            </Provider>
        );
    }
};
