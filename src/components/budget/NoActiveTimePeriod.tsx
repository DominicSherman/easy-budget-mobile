import React, {FC, useState} from 'react';
import {View, Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {screenWrapper} from '../../styles/shared-styles';
import DefaultText from '../generic/DefaultText';
import {textStyles} from '../../styles/text-styles';

const NoActiveTimePeriod: FC = () => {
    const [beginDate, setBeginDate] = useState(new Date('2020-06-12T14:42:42'));

    console.log('beginDate', beginDate);

    return (
        <Modal visible={true}>
            <DateTimePicker
                // onChange={setBeginDate}
                style={{ width: '100%', backgroundColor: 'white' }}
                value={beginDate}
            />
        </Modal>
    );
};

export default NoActiveTimePeriod;
