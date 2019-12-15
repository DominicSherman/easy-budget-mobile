import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import DefaultText from '../components/generic/DefaultText';
import {screenWrapper} from '../styles/shared-styles';
import {getUserId, signOut} from '../services/auth-service';
import {getActiveTimePeriodQuery} from '../graphql/queries';
import {GetActiveTimePeriod, GetActiveTimePeriodVariables} from '../../autogen/GetActiveTimePeriod';
import Button from '../components/generic/Button';
import {formatTimePeriod, getRoundedDate} from '../services/moment-service';
import {textStyles} from '../styles/text-styles';
import {getEarlyReturn} from '../services/error-and-loading-service';

const date = getRoundedDate();

const Home: React.FC = () => {
    const queryResult = useQuery<GetActiveTimePeriod, GetActiveTimePeriodVariables>(getActiveTimePeriodQuery, {
        variables: {
            date,
            userId: getUserId()
        }
    });

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {timePeriods} = queryResult.data;
    const activeTimePeriod = timePeriods[0];

    return (
        <SafeAreaView style={screenWrapper}>
            <View style={{margin: 16}}>
                <DefaultText
                    style={textStyles.medium}
                >
                    {`Current time period: ${formatTimePeriod(activeTimePeriod.beginDate)} - ${formatTimePeriod(activeTimePeriod.endDate)}`}
                </DefaultText>
            </View>
            <Button
                onPress={signOut}
                text={'Log Out'}
            />
        </SafeAreaView>
    );
};

export default Home;
