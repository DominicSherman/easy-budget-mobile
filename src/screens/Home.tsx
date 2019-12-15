import React from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import DefaultText from '../components/generic/DefaultText';
import {screenWrapper} from '../styles/shared-styles';
import {getUserId, signOut} from '../services/auth-service';
import {IAppState} from '../redux/reducer';
import {getActiveTimePeriodQuery} from '../graphql/queries';
import {GetActiveTimePeriod, GetActiveTimePeriodVariables} from '../../autogen/GetActiveTimePeriod';
import Button from '../components/generic/Button';
import {formatTimePeriod, getRoundedDate} from '../services/moment-service';
import {textStyles} from '../styles/text-styles';

const date = getRoundedDate();

const Home: React.FC<IAppState> = () => {
    const {data, loading} = useQuery<GetActiveTimePeriod, GetActiveTimePeriodVariables>(getActiveTimePeriodQuery, {
        variables: {
            date,
            userId: getUserId()
        }
    });

    if (!data || loading) {
        return (
            <View style={screenWrapper}>
                <ActivityIndicator />
            </View>
        );
    }

    const {timePeriods} = data;
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
