import React, {FC, useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {Alert} from 'react-native';

import {deleteTimePeriodMutation, updateTimePeriodMutation} from '../../graphql/mutations';
import Form, {IFormInput, InputType} from '../generic/Form';
import {deleteTimePeriodUpdate} from '../../utils/update-cache-utils';
import {ITimePeriod} from '../../../autogen/ITimePeriod';
import {UpdateTimePeriodMutation, UpdateTimePeriodMutationVariables} from '../../../autogen/UpdateTimePeriodMutation';
import {DeleteTimePeriodMutation, DeleteTimePeriodMutationVariables} from '../../../autogen/DeleteTimePeriodMutation';
import {easeInTransition} from '../../services/animation-service';
import {Color} from '../../constants/color';
import {errorAlert} from '../../services/alert-service';
import {onUpdateTimePeriod} from '../../redux/action-creators';
import {isActiveTimePeriod} from '../../utils/utils';

interface IEditTimePeriodFormProps {
    toggleExpanded: () => void
    timePeriod: ITimePeriod
}

const EditTimePeriodForm: FC<IEditTimePeriodFormProps> = ({toggleExpanded, timePeriod}) => {
    const {beginDate, endDate, timePeriodId, userId} = timePeriod;
    const [updatedBeginDate, setUpdatedBeginDate] = useState<Date>(new Date(beginDate));
    const [updatedEndDate, setUpdatedEndDate] = useState<Date>(new Date(endDate));
    const originalValues = {
        beginDate,
        endDate
    };
    const updatedValues = {
        beginDate: updatedBeginDate,
        endDate: updatedEndDate
    };
    const update = {
        beginDate: updatedBeginDate.toISOString(),
        endDate: updatedEndDate.toISOString(),
        timePeriodId,
        userId
    };
    const [updateTimePeriod, {loading}] = useMutation<UpdateTimePeriodMutation, UpdateTimePeriodMutationVariables>(updateTimePeriodMutation, {
        onCompleted: (data) => {
            toggleExpanded();
            onUpdateTimePeriod(data.updateTimePeriod);
        },
        onError: (error) => {
            errorAlert('Error', error.graphQLErrors[0].message);
        },
        variables: {
            timePeriod: {
                ...update
            }
        }
    });
    const [deleteTimePeriod] = useMutation<DeleteTimePeriodMutation, DeleteTimePeriodMutationVariables>(deleteTimePeriodMutation, {
        optimisticResponse: {
            deleteTimePeriod: timePeriodId
        },
        update: deleteTimePeriodUpdate,
        variables: {
            timePeriodId,
            userId
        }
    });
    const onPressDelete = (): void => {
        Alert.alert(
            'Delete this time period?',
            '',
            [
                {text: 'Cancel'},
                {
                    onPress: (): void => {
                        easeInTransition();
                        deleteTimePeriod();
                    },
                    text: 'Confirm'
                }
            ]
        );
    };
    const disabled = JSON.stringify(originalValues) === JSON.stringify(updatedValues);
    const inputs: IFormInput[] = [{
        date: updatedBeginDate,
        inputType: InputType.DATE,
        setDate: setUpdatedBeginDate,
        title: 'Begin Date'
    }, {
        date: updatedEndDate,
        inputType: InputType.DATE,
        roundUp: true,
        setDate: setUpdatedEndDate,
        title: 'End Date'
    }];
    const buttons = [{
        disabled: isActiveTimePeriod(timePeriod),
        onPress: onPressDelete,
        text: 'Delete',
        wrapperStyle: {
            backgroundColor: Color.peach
        }
    }, {
        disabled,
        loading,
        onPress: updateTimePeriod,
        text: 'Update',
        wrapperStyle: {
            backgroundColor: Color.brightGreen
        }
    }];

    return (
        <Form
            buttons={buttons}
            inputs={inputs}
        />
    );
};

export default EditTimePeriodForm;
