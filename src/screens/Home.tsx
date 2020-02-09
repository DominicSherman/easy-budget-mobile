import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {useSelector} from 'react-redux';
import {User} from '@react-native-community/google-signin';

import {LargeText, TitleText} from '../components/generic/Text';
import {getUserId} from '../services/auth-service';
import {homeScreenQuery} from '../graphql/queries';
import {formatTimePeriod, getRoundedDate} from '../services/moment-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import NoActiveTimePeriod from '../components/budget/NoActiveTimePeriod';
import {IAppState} from '../redux/reducer';
import {HomeScreenQuery, HomeScreenQueryVariables} from '../../autogen/HomeScreenQuery';
import {SCREEN_WIDTH} from '../constants/dimensions';
import CardView from '../components/generic/CardView';

const date = getRoundedDate();

const Home: React.FC = () => {
    const [timePeriodId, userInformation] = useSelector<IAppState, [string, User]>((state) => [state.timePeriodId, state.userInformation]);
    const queryResult = useQuery<HomeScreenQuery, HomeScreenQueryVariables>(homeScreenQuery, {
        variables: {
            date,
            timePeriodId,
            userId: getUserId()
        }
    });

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {timePeriods} = queryResult.data;
    const activeTimePeriod = timePeriods[0];

    if (!activeTimePeriod) {
        return (
            <NoActiveTimePeriod />
        );
    }

    return (
        <SafeAreaView style={{alignItems: 'center'}}>
            <LargeText style={{marginTop: 16}}>
                {`${formatTimePeriod(activeTimePeriod.beginDate)} - ${formatTimePeriod(activeTimePeriod.endDate)}`}
            </LargeText>
            <TitleText style={{marginTop: 16}}>
                {`Welcome, ${userInformation.user.givenName}!`}
            </TitleText>
            <View style={{marginTop: 32}}>

            </View>
        </SafeAreaView>
    );
};

export default Home;
