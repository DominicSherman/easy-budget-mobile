import React from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import {useQuery} from '@apollo/react-hooks';
import moment from 'moment';

import DefaultText from '../components/generic/DefaultText';
import {centeredColumn, screenWrapper} from '../styles/shared-styles';
import {getUserId, signOut} from '../services/auth-service';
import {colors} from '../constants/colors';
import {IAppState} from '../redux/reducer';
import {getActiveTimePeriod} from '../graphql/queries';
import {GetActiveTimePeriod, GetActiveTimePeriodVariables} from '../../autogen/GetActiveTimePeriod';

const date = moment().startOf('h').toISOString();

const Home: React.FC<IAppState> = () => {
    const {data, loading} = useQuery<GetActiveTimePeriod, GetActiveTimePeriodVariables>(getActiveTimePeriod, {
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
            <View>
                <DefaultText>{`Current time period: ${activeTimePeriod.beginDate} - ${activeTimePeriod.endDate}`}</DefaultText>
            </View>
            <Touchable
                onPress={signOut}
                style={{
                    ...centeredColumn,
                    borderColor: colors.black,
                    borderRadius: 4,
                    borderWidth: 1,
                    height: '10%',
                    width: '25%'
                }}
            >
                <DefaultText>{'Log Out'}</DefaultText>
            </Touchable>
        </SafeAreaView>
    );
};

export default Home;
