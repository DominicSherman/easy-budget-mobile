import {DataProxy} from 'apollo-cache';
import {FetchResult} from 'apollo-boost';

import {GetVariableCategories, GetVariableCategoriesVariables} from '../../autogen/GetVariableCategories';
import {getVariableCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {CreateVariableCategoryMutation} from '../../autogen/CreateVariableCategoryMutation';

export const createVariableCategoryUpdate = (cache: DataProxy, mutationResult: FetchResult<CreateVariableCategoryMutation>): void => {
    const {data} = mutationResult;
    const result = cache.readQuery<GetVariableCategories, GetVariableCategoriesVariables>({
        query: getVariableCategoriesQuery,
        variables: {
            userId: getUserId()
        }
    });

    if (result && data) {
        const updatedVariableCategories = [...result.variableCategories, data.createVariableCategory];

        cache.writeQuery<GetVariableCategories, GetVariableCategoriesVariables>({
            data: {
                variableCategories: updatedVariableCategories
            },
            query: getVariableCategoriesQuery,
            variables: {
                userId: getUserId()
            }
        });
    }
};
