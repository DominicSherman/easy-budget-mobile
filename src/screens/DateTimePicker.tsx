import React from 'react';
import {StyleSheet, View} from 'react-native';
import RNDatePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {RegularText} from '../components/generic/Text';
import {textStyles} from '../styles/text-styles';
import Button from '../components/generic/Button';
import {IScreenFC} from '../types/global';
import {Route} from '../enums/Route';

const styles = StyleSheet.create({
    centerWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
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
}

const oneYear = moment().add(1, 'year').toISOString();

const DateTimePicker: IScreenFC<Route.DATE_PICKER> = ({route: {params: {date, setDate, title}}}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.wrapper}>
            <View style={styles.centerWrapper}>
                <RegularText style={textStyles.large}>{title}</RegularText>
            </View>
            <RNDatePicker
                maximumDate={new Date(oneYear)}
                minimumDate={new Date()}
                onChange={(event: Event, date?: Date): void => {
                    if (date) {
                        setDate(date);
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
