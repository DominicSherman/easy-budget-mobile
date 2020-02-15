import React, {FC, useState} from 'react';
import {View} from 'react-native';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import uuid from 'uuid';
import {useMutation} from '@apollo/react-hooks';

import {RegularText} from '../generic/Text';
import {textStyles} from '../../styles/text-styles';
import Button from '../generic/Button';
import {screenWrapper} from '../../styles/shared-styles';
import {Route} from '../../enums/Route';
import {getUserId} from '../../services/auth-service';
import {createTimePeriodMutation} from '../../graphql/mutations';
import {CreateTimePeriodMutation, CreateTimePeriodMutationVariables} from '../../../autogen/CreateTimePeriodMutation';
import {setAppState} from '../../redux/action-creators';

const now = moment().startOf('day').toISOString();
const fourWeeks = moment().startOf('day').add(4, 'w').subtract(1, 'd').toISOString();
const formats = {
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    sameDay: '[Today]',
    sameElse: 'ddd, MMM DD'
};

const NoActiveTimePeriod: FC = () => {
    const [beginDate, setBeginDate] = useState<Date>(new Date(now));
    const [endDate, setEndDate] = useState<Date>(new Date(fourWeeks));
    const navigation = useNavigation();
    const timePeriod = {
        beginDate: moment(beginDate).toISOString(),
        endDate: moment(endDate).toISOString(),
        timePeriodId: uuid.v4(),
        userId: getUserId()
    };

    const [createTimePeriod, {loading}] = useMutation<CreateTimePeriodMutation, CreateTimePeriodMutationVariables>(createTimePeriodMutation, {
        onCompleted: () => {
            setAppState();
        },
        optimisticResponse: {
            createTimePeriod: {
                __typename: 'TimePeriod',
                ...timePeriod
            }
        },
        variables: {
            timePeriod
        }
    });

    return (
        <View style={screenWrapper}>
            <RegularText style={textStyles.large}>{'Create New Time Period'}</RegularText>
            <RegularText style={{marginTop: 16}}>{'Beginning'}</RegularText>
            <Button
                onPress={(): void => {
                    navigation.navigate({
                        name: Route.DATE_PICKER,
                        params: {
                            date: beginDate,
                            setDate: setBeginDate,
                            title: 'Begin Date'
                        }
                    });
                }}
                text={moment(beginDate).calendar(undefined, formats)}
            />
            <RegularText style={{marginTop: 16}}>{'Final Day'}</RegularText>
            <Button
                onPress={(): void => {
                    navigation.navigate({
                        name: Route.DATE_PICKER,
                        params: {
                            date: endDate,
                            setDate: setEndDate,
                            title: 'End Date'
                        }
                    });
                }}
                text={moment(endDate).calendar(undefined, formats)}
            />
            <RegularText style={[textStyles.medium, {marginVertical: 32}]}>
                {`${moment(endDate).diff(moment(beginDate), 'days')} days`}
            </RegularText>
            <Button
                loading={loading}
                onPress={async (): Promise<void> => {
                    await createTimePeriod();
                }}
                text={'Create'}
            />
        </View>
    );
};

export default NoActiveTimePeriod;
