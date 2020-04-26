import React, {FC, useState} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {StyleSheet, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import {getTimePeriodQuery} from '../../graphql/queries';
import {getUserId} from '../../services/auth-service';
import {FontWeight, LargeText, RegularText, SmallText} from '../generic/Text';
import {GetTimePeriod, GetTimePeriodVariables} from '../../../autogen/GetTimePeriod';
import CardView from '../generic/CardView';
import {CARD_MARGIN, CARD_WIDTH} from '../../constants/dimensions';
import {getFormattedTimePeriodLength, getFormattedTimePeriodText} from '../../utils/utils';
import {easeInTransition} from '../../services/animation-service';
import {centeredColumn, centeredRow} from '../../styles/shared-styles';
import {useBudgetNavigation, useSecondaryTextColor, useTimePeriodId} from '../../utils/hooks';
import {Color} from '../../constants/color';
import {setTimePeriod} from '../../redux/action-creators';
import {Route} from '../../enums/Route';

import EditTimePeriodForm from './EditTimePeriodForm';

const hitSlop = {
    bottom: 36,
    left: 36,
    right: 36,
    top: 36
};

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginHorizontal: CARD_MARGIN,
        width: CARD_WIDTH
    }
});

const TimePeriodItem: FC<{ timePeriodId: string }> = ({timePeriodId}) => {
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
    const color = useSecondaryTextColor();
    const navigation = useBudgetNavigation();
    const currentlyBrowsing = useTimePeriodId() === timePeriodId;

    if (!queryResult.data) {
        return null;
    }

    const {timePeriod} = queryResult.data;
    const onBrowse = (): void => {
        setTimePeriod(timePeriod);
        navigation.navigate({
            name: Route.HOME,
            params: {}
        });
    };

    return (
        <CardView
            onPress={toggleExpanded}
            shadow
            style={styles.wrapper}
            testID={`TimePeriodItem-${timePeriod.timePeriodId}`}
        >
            <View
                style={{
                    ...centeredRow,
                    justifyContent: 'space-between',
                    width: '100%'
                }}
            >
                <View style={centeredColumn}>
                    <LargeText>{getFormattedTimePeriodText(timePeriod)}</LargeText>
                    <SmallText color={color}>{getFormattedTimePeriodLength(timePeriod)}</SmallText>
                </View>
                <Touchable
                    disabled={currentlyBrowsing}
                    hitSlop={hitSlop}
                    onPress={onBrowse}
                >
                    <RegularText
                        color={currentlyBrowsing ? Color.lightGreen : Color.shockBlue}
                        fontWeight={FontWeight.BOLD}
                    >
                        {currentlyBrowsing ? 'Current' : 'Browse'}
                    </RegularText>
                </Touchable>
            </View>
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
