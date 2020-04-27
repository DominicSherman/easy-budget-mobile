import React, {FC} from 'react';
import moment from 'moment';

import {Route} from '../../enums/Route';
import {useBudgetNavigation} from '../../utils/hooks';
import {Color} from '../../constants/color';

import {TinyText} from './Text';
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
    roundUp?: boolean
}

const Date: FC<IDateProps> = (props) => {
    const navigation = useBudgetNavigation();
    const {date, setDate, title, roundUp} = props;

    return (
        <>
            <TinyText style={{marginTop: 16}}>{title}</TinyText>
            <Button
                onPress={(): void => {
                    navigation.navigate({
                        name: Route.DATE_PICKER,
                        params: {
                            date,
                            roundUp,
                            setDate,
                            title
                        }
                    });
                }}
                testID={`Date-${title}`}
                text={moment(date).calendar(undefined, formats)}
                wrapperStyle={{marginBottom: 8}}
            />
        </>
    );
};

export default Date;
