import React, {FC} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {KeyboardAwareSectionList} from 'react-native-keyboard-aware-scroll-view';
import {FlatList, StyleSheet, View} from 'react-native';

import {getTimePeriodsQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {sortByBeginDate} from '../utils/sorting-utils';
import TimePeriodItem from '../components/time-period/TimePeriodItem';
import {GetTimePeriods, GetTimePeriodsVariables} from '../../autogen/GetTimePeriods';
import {TitleText} from '../components/generic/Text';
import {CARD_MARGIN} from '../constants/dimensions';
import CreateTimePeriodForm from '../components/time-period/CreateTimePeriodForm';
import {usePrimaryBackgroundColor} from '../utils/hooks';
import {isActiveTimePeriod, isFutureTimePeriod, isPreviousTimePeriod} from '../utils/utils';

const styles = StyleSheet.create({
    title: {
        paddingHorizontal: CARD_MARGIN,
        paddingTop: 32
    }
});

const TimePeriods: FC = () => {
    const queryResult = useQuery<GetTimePeriods, GetTimePeriodsVariables>(getTimePeriodsQuery, {
        variables: {
            userId: getUserId()
        }
    });
    const backgroundColor = usePrimaryBackgroundColor();

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const sortedTimePeriods = queryResult.data.timePeriods.sort(sortByBeginDate);
    const prevTimePeriods = sortedTimePeriods.filter(isPreviousTimePeriod);
    const futureTimePeriods = sortedTimePeriods.filter(isFutureTimePeriod);
    const activeTimePeriod = sortedTimePeriods.filter(isActiveTimePeriod);
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
        <View style={{height: '100%'}}>
            <KeyboardAwareSectionList
                keyExtractor={(item): string => item.timePeriodId}
                renderItem={({item}): JSX.Element => <TimePeriodItem timePeriodId={item.timePeriodId} />}
                renderSectionHeader={({section}): JSX.Element =>
                    <View style={[styles.title, {backgroundColor}]}>
                        <TitleText>{section.title}</TitleText>
                    </View>
                }
                sections={sections}
                showsVerticalScrollIndicator={false}
            />
            <CreateTimePeriodForm />
        </View>
    );
};

export default TimePeriods;
