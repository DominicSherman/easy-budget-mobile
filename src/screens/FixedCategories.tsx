import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {useQuery} from '@apollo/react-hooks';

import {IAppState} from '../redux/reducer';
import {GetFixedCategories, GetFixedCategoriesVariables} from '../../autogen/GetFixedCategories';
import {getFixedCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import CreateFixedCategoryForm from '../components/budget/CreateFixedCategoryForm';
import {sortByName} from '../utils/sorting-utils';
import NoActiveTimePeriod from '../components/budget/NoActiveTimePeriod';
import FixedCategoryItem from '../components/budget/FixedCategoryItem';

const FixedCategories: React.FC = () => {
    const timePeriodId = useSelector<IAppState, string>((state) => state.timePeriodId);
    const queryResult = useQuery<GetFixedCategories, GetFixedCategoriesVariables>(getFixedCategoriesQuery, {
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

    const {fixedCategories} = queryResult.data;
    const sortedFixedCategories = fixedCategories.sort(sortByName);

    return (
        <FlatList
            ListFooterComponent={<CreateFixedCategoryForm />}
            data={sortedFixedCategories}
            keyExtractor={(item): string => item.fixedCategoryId}
            renderItem={({item}): JSX.Element =>
                <FixedCategoryItem fixedCategory={item} />
            }
        />
    );
};

export default FixedCategories;
