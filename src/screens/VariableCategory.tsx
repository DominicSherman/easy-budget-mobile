import React from 'react';
import {View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import {IScreenFC} from '../types/global';
import {Route} from '../enums/routes';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {getUserId} from '../services/auth-service';
import {getVariableCategoryQuery} from '../graphql/queries';
import EditVariableCategoryForm from '../components/budget/EditVariableCategoryForm';
import {GetVariableCategory, GetVariableCategoryVariables} from '../../autogen/GetVariableCategory';

export interface IVariableCategoryProps {
    variableCategoryId: string
}

const VariableCategory: IScreenFC<Route.VARIABLE_CATEGORY> = ({route: {params: {variableCategoryId}}}) => {
    const queryResult = useQuery<GetVariableCategory, GetVariableCategoryVariables>(getVariableCategoryQuery, {
        variables: {
            userId: getUserId(),
            variableCategoryId
        }
    });

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {variableCategory} = queryResult.data;

    return (
        <View style={{alignItems: 'center'}}>
            <EditVariableCategoryForm variableCategory={variableCategory} />
        </View>
    );
};

export default VariableCategory;
