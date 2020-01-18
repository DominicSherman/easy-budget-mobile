import {QueryResult} from '@apollo/react-common';
import React from 'react';

import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';

export const getEarlyReturn = (queryResult: QueryResult<any, any>): JSX.Element => {
    if (queryResult.loading) {
        return <LoadingView />;
    }

    return <ErrorView />;
};
