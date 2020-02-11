import React from 'react';
import {View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import {IScreenFC} from '../types/global';
import {Route} from '../enums/routes';
import {getFixedCategoryQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {GetFixedCategory, GetFixedCategoryVariables} from '../../autogen/GetFixedCategory';

import EditFixedCategoryForm from '../components/budget/EditFixedCategoryForm';

export interface IFixedCategoryProps {
    fixedCategoryId: string
}

const FixedCategory: IScreenFC<Route.FIXED_CATEGORY> = ({route: {params: {fixedCategoryId}}}) => {
    const queryResult = useQuery<GetFixedCategory, GetFixedCategoryVariables>(getFixedCategoryQuery, {
        variables: {
            fixedCategoryId,
            userId: getUserId()
        }
    });

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {fixedCategory} = queryResult.data;

    return (
        <View style={{alignItems: 'center'}}>
            <EditFixedCategoryForm fixedCategory={fixedCategory} />
        </View>
    );
};

export default FixedCategory;
