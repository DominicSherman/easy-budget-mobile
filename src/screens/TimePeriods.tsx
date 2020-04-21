import React, {FC} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {KeyboardAwareSectionList} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import {StyleSheet} from 'react-native';

import {getTimePeriodsQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {sortByBeginDate} from '../utils/sorting-utils';
import TimePeriodItem from '../components/time-period/TimePeriodItem';
import {GetTimePeriods, GetTimePeriodsVariables} from '../../autogen/GetTimePeriods';
import {TitleText} from '../components/generic/Text';
import {CARD_MARGIN} from '../constants/dimensions';

const styles = StyleSheet.create({
    title: {
        marginLeft: CARD_MARGIN,
        marginTop: 32
    }
});

const TimePeriods: FC = () => {
    const queryResult = useQuery<GetTimePeriods, GetTimePeriodsVariables>(getTimePeriodsQuery, {
        variables: {
            userId: getUserId()
        }

    });

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const currentTime = moment().toISOString();
    const sortedTimePeriods = queryResult.data.timePeriods.sort(sortByBeginDate);
    const prevTimePeriods = sortedTimePeriods.filter((timePeriod) => timePeriod.endDate < currentTime);
    const futureTimePeriods = sortedTimePeriods.filter((timePeriod) => timePeriod.beginDate > currentTime);
    const activeTimePeriod = sortedTimePeriods.filter((timePeriod) => timePeriod.beginDate <= currentTime && timePeriod.endDate >= currentTime);
    const sections = [{
        data: activeTimePeriod,
        title: 'Active'
    }, {
        data: futureTimePeriods,
        title: 'Upcoming'
    }, {
        data: prevTimePeriods,
        title: 'Previous'
    }].filter((s) => s.data.length !== 0);

    return (
        <KeyboardAwareSectionList
            renderItem={({item}): JSX.Element => <TimePeriodItem timePeriodId={item.timePeriodId} />}
            renderSectionHeader={({section}): JSX.Element => <TitleText style={styles.title}>{section.title}</TitleText>}
            sections={sections}
        />
    );
};

export default TimePeriods;
