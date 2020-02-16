import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as navigation from '@react-navigation/native';

import {chance} from '../../chance';
import {createTimePeriodMutation} from '../../../src/graphql/mutations';
import {getUserId} from '../../../src/services/auth-service';
import NoActiveTimePeriod from '../../../src/components/budget/NoActiveTimePeriod';
import * as actionCreators from '../../../src/redux/action-creators';
import Button from '../../../src/components/generic/Button';

jest.mock('@apollo/react-hooks');
jest.mock('@react-navigation/native');
jest.mock('../../../src/redux/action-creators');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/redux/hooks');

describe('NoActiveTimePeriod', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useNavigation} = navigation as jest.Mocked<typeof navigation>;
    const {setAppState} = actionCreators as jest.Mocked<typeof actionCreators>;

    let testRenderer,
        testInstance,
        expectedNavigation,
        expectedLoading,
        createTimePeriod;

    const render = (): void => {
        testRenderer = TestRenderer.create(<NoActiveTimePeriod />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        createTimePeriod = jest.fn();
        expectedLoading = chance.bool();
        expectedNavigation = {
            navigate: jest.fn()
        };

        // @ts-ignore
        useMutation.mockReturnValue([createTimePeriod, {loading: expectedLoading}]);
        useNavigation.mockReturnValue(expectedNavigation);

        render();
    });

    it('should call useMutation', () => {
        const timePeriod = {
            beginDate: expect.any(String),
            endDate: expect.any(String),
            timePeriodId: expect.any(String),
            userId: getUserId()
        };

        expect(useMutation).toHaveBeenCalledWith(createTimePeriodMutation, {
            onCompleted: expect.any(Function),
            optimisticResponse: {
                createTimePeriod: {
                    __typename: 'TimePeriod',
                    ...timePeriod
                }
            },
            variables: {
                timePeriod
            }
        });

        useMutation.mock.calls[0][1]!.onCompleted!({});

        expect(setAppState).toHaveBeenCalledTimes(1);
    });

    it('should render 3 buttons', () => {
        const renderedButtons = testInstance.findAllByType(Button);
        const beginButton = renderedButtons[0];
        const endButton = renderedButtons[1];
        const submitButton = renderedButtons[2];

        beginButton.props.onPress();
        endButton.props.onPress();
        submitButton.props.onPress();

        expect(expectedNavigation.navigate).toHaveBeenCalledTimes(2);
        expect(createTimePeriod).toHaveBeenCalledTimes(1);
    });
});
