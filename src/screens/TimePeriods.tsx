import React, {FC} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {FlatList} from 'react-native';

import {getTimePeriodsQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {sortByBeginDate} from '../utils/sorting-utils';
import TimePeriodItem from '../components/time-period/TimePeriodItem';
import {GetTimePeriods, GetTimePeriodsVariables} from '../../autogen/GetTimePeriods';

const TimePeriods: FC = () => {
    const queryResult = useQuery<GetTimePeriods, GetTimePeriodsVariables>(getTimePeriodsQuery, {
        variables: {
            userId: getUserId()
        }

    });

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const sortedTimePeriods = queryResult.data.timePeriods.sort(sortByBeginDate);

    return (
        <FlatList
            data={sortedTimePeriods}
            renderItem={({item}): JSX.Element => <TimePeriodItem timePeriodId={item.timePeriodId} />}
        />
    );
};

export default TimePeriods;
