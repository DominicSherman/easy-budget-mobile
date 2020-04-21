import React, {FC} from 'react';
import moment from 'moment';

import {Route} from '../../enums/Route';
import {useBudgetNavigation} from '../../utils/hooks';
import {Color} from '../../constants/color';

import {RegularText} from './Text';
import Button from './Button';

const formats = {
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    sameDay: '[Today]',
    sameElse: 'ddd, MMM DD'
};

export interface IDateProps {
    date: Date
    setDate: (date: Date) => void
    title: string
}

const Date: FC<IDateProps> = (props) => {
    const navigation = useBudgetNavigation();
    const {date, setDate, title} = props;

    return (
        <>
            <RegularText style={{marginTop: 16}}>{title}</RegularText>
            <Button
                onPress={(): void => {
                    navigation.navigate({
                        name: Route.DATE_PICKER,
                        params: {
                            date,
                            setDate,
                            title
                        }
                    });
                }}
                text={moment(date).calendar(undefined, formats)}
                wrapperStyle={{
                    backgroundColor: Color.sunflower,
                    marginBottom: 16
                }}
            />
        </>
    );
};

export default Date;
