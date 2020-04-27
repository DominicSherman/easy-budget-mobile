import React, {FC, useState} from 'react';
import uuid from 'uuid';
import {useMutation} from '@apollo/react-hooks';
import moment from 'moment';

import {createTimePeriodMutation} from '../../graphql/mutations';
import {getUserId} from '../../services/auth-service';
import {CreateTimePeriodMutation, CreateTimePeriodMutationVariables} from '../../../autogen/CreateTimePeriodMutation';
import Form, {IFormInput, InputType} from '../generic/Form';
import {createTimePeriodUpdate} from '../../utils/update-cache-utils';
import {errorAlert} from '../../services/alert-service';
import {onCreateTimePeriod} from '../../redux/action-creators';
import {Color} from '../../constants/color';

const now = moment().startOf('day').toISOString();
const fourWeeks = moment().startOf('day').add(4, 'w').toISOString();

const CreateTimePeriodForm: FC = () => {
    const [beginDate, setBeginDate] = useState<Date>(new Date(now));
    const [endDate, setEndDate] = useState<Date>(new Date(fourWeeks));
    const timePeriod = {
        beginDate: moment(beginDate).toISOString(),
        endDate: moment(endDate).toISOString(),
        timePeriodId: uuid.v4(),
        userId: getUserId()
    };

    const [createTimePeriod, {loading}] = useMutation<CreateTimePeriodMutation, CreateTimePeriodMutationVariables>(createTimePeriodMutation, {
        onCompleted: (data) => {
            setBeginDate(new Date(now));
            setEndDate(new Date(fourWeeks));
            onCreateTimePeriod(data.createTimePeriod);
        },
        onError: (error) => {
            errorAlert('Error', error.graphQLErrors[0].message);
        },
        update: createTimePeriodUpdate,
        variables: {
            timePeriod
        }
    });
    const inputs: IFormInput[] = [{
        date: beginDate,
        inputType: InputType.DATE,
        setDate: setBeginDate,
        title: 'Begin Date'
    }, {
        date: endDate,
        inputType: InputType.DATE,
        roundUp: true,
        setDate: setEndDate,
        title: 'End Date'
    }];
    const buttons = [{
        color: Color.brightGreen,
        loading,
        onPress: createTimePeriod,
        text: 'Create',
        wrapperStyle: {marginTop: 16}
    }];

    return (
        <Form
            buttons={buttons}
            headerText={'Create Time Period'}
            inputs={inputs}
            toggleable
        />
    );
};

export default CreateTimePeriodForm;
