import React, {FC} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {FlatList, View} from 'react-native';
import moment from 'moment';

import {getTimePeriodsQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {sortByBeginDate} from '../utils/sorting-utils';
import {LargeText} from '../components/generic/Text';
import {formatTimePeriod} from '../services/moment-service';

const TimePeriods: FC = () => {
    const queryResult = useQuery(getTimePeriodsQuery, {
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
            renderItem={({item}): JSX.Element =>
                <View style={{marginVertical: 16}}>
                    <LargeText>{`${formatTimePeriod(item.beginDate)} - ${formatTimePeriod(moment(item.endDate).toISOString())} (${moment(item.endDate).diff(moment(item.beginDate), 'd')} days)`}</LargeText>
                </View>
            }
        />
    );
};

export default TimePeriods;
