import TestRenderer from 'react-test-renderer';
import React from 'react';
import RNDatePicker from '@react-native-community/datetimepicker';
import * as reactNavigationNative from '@react-navigation/native';

import DateTimePicker from '../../src/screens/DateTimePicker';
import {chance} from '../chance';
import DefaultText from '../../src/components/generic/DefaultText';
import Button from '../../src/components/generic/Button';
import {createRouteProps} from '../models';

jest.mock('@react-navigation/native');

describe('DateTimePicker', () => {
    const {useNavigation} = reactNavigationNative as jest.Mocked<typeof reactNavigationNative>;

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

        useNavigation.mockReturnValue(expectedNavigation);

        render();
    });

    it('should render the title', () => {
        const renderedText = root.findAllByType(DefaultText)[0];

        expect(renderedText.props.children).toBe(expectedProps.title);
    });

    it('should render the RNDatePicker', () => {
        const expectedDate = chance.string();

        const renderedPicker = root.findByType(RNDatePicker);

        expect(renderedPicker.props.value).toBe(expectedProps.date);

        renderedPicker.props.onChange(chance.string(), expectedDate);

        expect(expectedProps.setDate).toHaveBeenCalledTimes(1);
        expect(expectedProps.setDate).toHaveBeenCalledWith(expectedDate);

        expectedProps.setDate.mockReset();

        renderedPicker.props.onChange(chance.string(), null);

        expect(expectedProps.setDate).not.toHaveBeenCalled();
    });

    it('should render the button', () => {
        const renderedButton = root.findByType(Button);

        expect(renderedButton.props).toEqual({
            onPress: expectedNavigation.goBack,
            text: 'Select'
        });
    });
});
