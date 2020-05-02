import {QueryResult} from '@apollo/react-common';
import React from 'react';

import LoadingView from '../components/generic/LoadingView';
import ErrorView from '../components/generic/ErrorView';

export const getEarlyReturn = (queryResult: QueryResult<any, any>): JSX.Element => {
    if (queryResult.loading) {
        return <LoadingView />;
    }

    return <ErrorView refetch={queryResult.refetch} />;
};
