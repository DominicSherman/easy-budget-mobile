import React, {FC} from 'react';
import {useQuery} from '@apollo/react-hooks';
import moment from 'moment';
import {View} from 'react-native';

import {getTimePeriodQuery} from '../../graphql/queries';
import {getUserId} from '../../services/auth-service';
import {LargeText} from '../generic/Text';
import {formatTimePeriod} from '../../services/moment-service';
import {GetTimePeriod, GetTimePeriodVariables} from '../../../autogen/GetTimePeriod';

const TimePeriodItem: FC<{timePeriodId: string}> = ({timePeriodId}) => {
    const queryResult = useQuery<GetTimePeriod, GetTimePeriodVariables>(getTimePeriodQuery, {
        variables: {
            timePeriodId,
            userId: getUserId()
        }
    });

    if (!queryResult.data) {
        return null;
    }

    const {timePeriod} = queryResult.data;

    return (
        <View style={{marginVertical: 16}}>
            <LargeText>{`${formatTimePeriod(timePeriod.beginDate)} - ${formatTimePeriod(moment(timePeriod.endDate).toISOString())} (${moment(timePeriod.endDate).diff(moment(timePeriod.beginDate), 'd')} days)`}</LargeText>
        </View>
    );
};

export default TimePeriodItem;
