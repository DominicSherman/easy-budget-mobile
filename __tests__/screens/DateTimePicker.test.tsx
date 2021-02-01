import TestRenderer from 'react-test-renderer';
import React from 'react';
import RNDatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import DateTimePicker from '../../src/screens/DateTimePicker';
import {chance} from '../chance';
import {TitleText} from '../../src/components/generic/Text';
import Button from '../../src/components/generic/Button';
import {createRouteProps} from '../models';
import * as hooks from '../../src/utils/hooks';

jest.mock('@react-navigation/native');
jest.mock('@react-native-community/datetimepicker', () => {
    return jest.fn(() => null);
});
jest.mock('../../src/utils/hooks');

describe('DateTimePicker', () => {
    const {useBudgetNavigation} = hooks as jest.Mocked<typeof hooks>;

    let expectedProps,
        expectedNavigation,
        root;

    const render = (): void => {
        // @ts-ignore
        root = TestRenderer.create(
            <DateTimePicker {...createRouteProps(expectedProps)} />
        ).root;
    };

    beforeEach(() => {
        expectedProps = {
            date: new Date(),
            setDate: jest.fn(),
            title: chance.string()
        };
        expectedNavigation = {
            goBack: jest.fn()
        };

        useBudgetNavigation.mockReturnValue(expectedNavigation);

        render();
    });

    it('should render the title', () => {
        const renderedText = root.findAllByType(TitleText)[0];

        expect(renderedText.props.children).toBe(expectedProps.title);
    });

    it('should render the RNDatePicker', () => {
        const expectedDate = chance.date();

        const renderedPicker = root.findByType(RNDatePicker);

        expect(renderedPicker.props.value).toBe(expectedProps.date);

        renderedPicker.props.onChange(chance.string(), expectedDate);

        expect(expectedProps.setDate).toHaveBeenCalledTimes(1);
        expect(expectedProps.setDate).toHaveBeenCalledWith(new Date(moment(expectedDate).startOf('d').toISOString()));

        expectedProps.setDate.mockReset();

        renderedPicker.props.onChange(chance.string(), null);

        expect(expectedProps.setDate).not.toHaveBeenCalled();
    });

    it('should handle it correctly if roundUp is true', () => {
        expectedProps.roundUp = true;
        render();

        const expectedDate = chance.date();
        const renderedPicker = root.findByType(RNDatePicker);

        expect(renderedPicker.props.value).toBe(expectedProps.date);

        renderedPicker.props.onChange(chance.string(), expectedDate);

        expect(expectedProps.setDate).toHaveBeenCalledTimes(1);
        expect(expectedProps.setDate).toHaveBeenCalledWith(new Date(moment(expectedDate).endOf('d').toISOString()));
    });

    it('should render the button', () => {
        const renderedButton = root.findByType(Button);

        expect(renderedButton.props).toEqual({
            onPress: expectedNavigation.goBack,
            text: 'Select'
        });
    });
});
