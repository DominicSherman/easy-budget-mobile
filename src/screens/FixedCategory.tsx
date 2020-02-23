import React from 'react';
import {ScrollView} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import {IScreenFC} from '../types/global';
import {Route} from '../enums/Route';
import {getFixedCategoryQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {GetFixedCategory, GetFixedCategoryVariables} from '../../autogen/GetFixedCategory';
import EditFixedCategoryForm from '../components/fixed-category/EditFixedCategoryForm';
import DeleteFixedCategoryButton from '../components/fixed-category/DeleteFixedCategoryButton';

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
        <ScrollView
            contentContainerStyle={{alignItems: 'center'}}
            style={{height: '100%'}}
        >
            <EditFixedCategoryForm fixedCategory={fixedCategory} />
            <DeleteFixedCategoryButton fixedCategoryId={fixedCategoryId} />
        </ScrollView>
    );
};

export default FixedCategory;
