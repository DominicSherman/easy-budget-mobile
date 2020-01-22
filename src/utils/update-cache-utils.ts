import {DataProxy} from 'apollo-cache';
import {FetchResult} from 'apollo-boost';

import {GetVariableCategories, GetVariableCategoriesVariables} from '../../autogen/GetVariableCategories';
import {getFixedCategoriesQuery, getVariableCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {CreateVariableCategoryMutation} from '../../autogen/CreateVariableCategoryMutation';
import {getState} from '../redux/store';
import {CreateFixedCategoryMutation} from '../../autogen/CreateFixedCategoryMutation';
import {GetFixedCategories, GetFixedCategoriesVariables} from '../../autogen/GetFixedCategories';

export const createVariableCategoryUpdate = (cache: DataProxy, mutationResult: FetchResult<CreateVariableCategoryMutation>): void => {
    const query = getVariableCategoriesQuery;
    const variables = {
        timePeriodId: getState().timePeriodId,
        userId: getUserId()
    };
    const {data} = mutationResult;
    const result = cache.readQuery<GetVariableCategories, GetVariableCategoriesVariables>({
        query,
        variables
    });

    if (result && data) {
        const updatedVariableCategories = [...result.variableCategories, data.createVariableCategory];

        cache.writeQuery<GetVariableCategories, GetVariableCategoriesVariables>({
            data: {
                variableCategories: updatedVariableCategories
            },
            query,
            variables
        });
    }
};

export const createFixedCategoryUpdate = (cache: DataProxy, mutationResult: FetchResult<CreateFixedCategoryMutation>): void => {
    const query = getFixedCategoriesQuery;
    const variables = {
        timePeriodId: getState().timePeriodId,
        userId: getUserId()
    };
    const {data} = mutationResult;
    const result = cache.readQuery<GetFixedCategories, GetFixedCategoriesVariables>({
        query,
        variables
    });

    if (result && data) {
        const updatedFixedCategories = [...result.fixedCategories, data.createFixedCategory];

        cache.writeQuery<GetFixedCategories, GetFixedCategoriesVariables>({
            data: {
                fixedCategories: updatedFixedCategories
            },
            query,
            variables
        });
    }
};
