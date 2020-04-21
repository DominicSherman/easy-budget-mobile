import React, {FC, useState} from 'react';
import uuid from 'uuid';
import {useMutation} from '@apollo/react-hooks';
import moment from 'moment';

import {createTimePeriodMutation} from '../../graphql/mutations';
import {getUserId} from '../../services/auth-service';
import {CreateTimePeriodMutation, CreateTimePeriodMutationVariables} from '../../../autogen/CreateTimePeriodMutation';
import Form, {IFormInput, InputType} from '../generic/Form';
import {createTimePeriodUpdate} from '../../utils/update-cache-utils';

interface ICreateTimePeriodFormProps {
    showCreateForm?: boolean
}

const now = moment().startOf('day').toISOString();
const fourWeeks = moment().startOf('day').add(4, 'w').toISOString();

const CreateTimePeriodForm: FC<ICreateTimePeriodFormProps> = ({showCreateForm}) => {
    const [beginDate, setBeginDate] = useState<Date>(new Date(now));
    const [endDate, setEndDate] = useState<Date>(new Date(fourWeeks));
    const timePeriod = {
        beginDate: moment(beginDate).toISOString(),
        endDate: moment(endDate).add(1, 'd').toISOString(),
        timePeriodId: uuid.v4(),
        userId: getUserId()
    };

    const [createTimePeriod] = useMutation<CreateTimePeriodMutation, CreateTimePeriodMutationVariables>(createTimePeriodMutation, {
        optimisticResponse: {
            createTimePeriod: {
                __typename: 'TimePeriod',
                ...timePeriod
            }
        },
        update: createTimePeriodUpdate,
        variables: {
            timePeriod
        }
    });
    const onPress = (): void => {
        createTimePeriod();
        setBeginDate(new Date(now));
        setEndDate(new Date(fourWeeks));
    };
    const inputs: IFormInput[] = [{
        date: beginDate,
        inputType: InputType.DATE,
        setDate: setBeginDate,
        title: 'Begin Date'
    }, {
        date: endDate,
        inputType: InputType.DATE,
        setDate: setEndDate,
        title: 'End Date'
    }];
    const buttons = [{
        onPress,
        text: 'Create'
    }];

    return (
        <Form
            buttons={buttons}
            headerText={'Create Time Period'}
            inputs={inputs}
            toggleable
            visibleByDefault={showCreateForm}
        />
    );
};

export default CreateTimePeriodForm;
