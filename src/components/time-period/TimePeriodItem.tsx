import React, {FC} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {StyleSheet} from 'react-native';

import {getTimePeriodQuery} from '../../graphql/queries';
import {getUserId} from '../../services/auth-service';
import {LargeText} from '../generic/Text';
import {GetTimePeriod, GetTimePeriodVariables} from '../../../autogen/GetTimePeriod';
import CardView from '../generic/CardView';
import {CARD_MARGIN, CARD_WIDTH} from '../../constants/dimensions';
import {getFormattedTimePeriodText} from '../../utils/utils';

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginHorizontal: CARD_MARGIN,
        width: CARD_WIDTH
    }
});

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
        <CardView
            shadow
            style={styles.wrapper}
        >
            <LargeText>{getFormattedTimePeriodText(timePeriod)}</LargeText>
        </CardView>
    );
};

export default TimePeriodItem;
