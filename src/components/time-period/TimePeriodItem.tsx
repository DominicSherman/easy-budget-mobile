import React, {FC, useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {StyleSheet} from 'react-native';

import {getTimePeriodQuery} from '../../graphql/queries';
import {getUserId} from '../../services/auth-service';
import {LargeText} from '../generic/Text';
import {GetTimePeriod, GetTimePeriodVariables} from '../../../autogen/GetTimePeriod';
import CardView from '../generic/CardView';
import {CARD_MARGIN, CARD_WIDTH} from '../../constants/dimensions';
import {getFormattedTimePeriodText} from '../../utils/utils';
import {easeInTransition} from '../../services/animation-service';

import EditTimePeriodForm from './EditTimePeriodForm';

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
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = (): void => {
        easeInTransition();
        setExpanded(!expanded);
    };

    if (!queryResult.data) {
        return null;
    }

    const {timePeriod} = queryResult.data;

    return (
        <CardView
            onPress={toggleExpanded}
            shadow
            style={styles.wrapper}
        >
            <LargeText>{getFormattedTimePeriodText(timePeriod)}</LargeText>
            {
                expanded &&
                    <EditTimePeriodForm
                        timePeriod={timePeriod}
                        toggleExpanded={toggleExpanded}
                    />
            }
        </CardView>
    );
};

export default TimePeriodItem;
