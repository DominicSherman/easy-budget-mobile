import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import {getVariableCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {GetVariableCategories, GetVariableCategoriesVariables} from '../../autogen/GetVariableCategories';
import {getEarlyReturn} from '../services/error-and-loading-service';
import CreateVariableCategoryForm from '../components/budget/CreateVariableCategoryForm';
import {sortByAmount} from '../utils/sorting-utils';
import NoActiveTimePeriod from '../components/budget/NoActiveTimePeriod';
import VariableCategoryItem from '../components/budget/VariableCategoryItem';
import {useTimePeriodId} from '../redux/hooks';

const VariableCategories: React.FC = () => {
    const timePeriodId = useTimePeriodId();
    const queryResult = useQuery<GetVariableCategories, GetVariableCategoriesVariables>(getVariableCategoriesQuery, {
        skip: !timePeriodId,
        variables: {
            timePeriodId,
            userId: getUserId()
        }
    });

    if (!timePeriodId) {
        return <NoActiveTimePeriod />;
    }

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {variableCategories} = queryResult.data;
    const sortedVariableCategories = variableCategories.sort(sortByAmount);

    return (
        <SafeAreaView>
            <FlatList
                ListHeaderComponent={<CreateVariableCategoryForm />}
                data={sortedVariableCategories}
                keyExtractor={(item): string => item.variableCategoryId}
                renderItem={({item}): JSX.Element =>
                    <VariableCategoryItem
                        variableCategory={item}
                    />
                }
            />
        </SafeAreaView>
    );
};

export default VariableCategories;
