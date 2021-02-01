import React from 'react';
import {StyleSheet, View} from 'react-native';
import RNDatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import {TitleText} from '../components/generic/Text';
import Button from '../components/generic/Button';
import {IScreenFC} from '../types/global';
import {Route} from '../enums/Route';
import {useBudgetNavigation} from '../utils/hooks';

const styles = StyleSheet.create({
    centerWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
        width: '100%'
    },
    wrapper: {
        height: '100%',
        justifyContent: 'center'
    }
});

export interface IDateTimePickerProps {
    date: Date
    setDate: (date: Date) => void
    title: string
    roundUp?: boolean
}

const DateTimePicker: IScreenFC<Route.DATE_PICKER> = ({route: {params: {date, setDate, title, roundUp = false}}}) => {
    const navigation = useBudgetNavigation();

    return (
        <View style={styles.wrapper}>
            <View style={styles.centerWrapper}>
                <TitleText>{title}</TitleText>
            </View>
            <RNDatePicker
                display={'inline'}
                onChange={(event: Event, date?: Date): void => {
                    if (date) {
                        let dateToSet;

                        if (roundUp) {
                            dateToSet = new Date(moment(date).endOf('d').toISOString());
                        } else {
                            dateToSet = new Date(moment(date).startOf('d').toISOString());
                        }

                        setDate(dateToSet);
                    }
                }}
                value={date}
            />
            <View style={styles.centerWrapper}>
                <Button
                    onPress={navigation.goBack}
                    text={'Select'}
                />
            </View>
        </View>
    );
};

export default DateTimePicker;
