import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

import {chance} from '../../chance';
import Form from '../../../src/components/generic/Form';
import Button, {IButtonProps} from '../../../src/components/generic/Button';
import Input, {IInputProps} from '../../../src/components/generic/Input';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/services/animation-service');

describe('Form', () => {
    let testRenderer,
        testInstance,
        expectedProps;

    const render = (): void => {
        testRenderer = TestRenderer.create(<Form {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    const createRandomButton = (): IButtonProps => ({
        disabled: chance.bool(),
        onPress: jest.fn(),
        text: chance.string()
    });

    const createRandomInput = (): IInputProps => ({
        onChange: jest.fn(),
        title: chance.string(),
        value: chance.string()
    });

    beforeEach(() => {
        expectedProps = {
            buttons: chance.n(createRandomButton, chance.d6()),
            inputs: chance.n(createRandomInput, chance.d6())
        };

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('when it is **not** toggleable', () => {
        it('should render the buttons', () => {
            expect(testInstance.findAllByType(Button)).toHaveLength(expectedProps.buttons.length);
        });

        it('should render the inputs', () => {
            expect(testInstance.findAllByType(Input)).toHaveLength(expectedProps.inputs.length);
        });
    });

    describe('when it is toggleable', () => {
        beforeEach(() => {
            expectedProps.toggleable = true;
            render();
        });

        it('should hide the inputs and buttons by default', () => {
            expect(testInstance.findAllByType(Button)).toHaveLength(0);
            expect(testInstance.findAllByType(Input)).toHaveLength(0);
        });

        it('should render an icon to toggle when toggleable', () => {
            const renderedIcon = testInstance.findByType(Feather);

            act(() => {
                renderedIcon.props.onPress();
            });

            expect(testInstance.findAllByType(Button)).toHaveLength(expectedProps.buttons.length);
            expect(testInstance.findAllByType(Input)).toHaveLength(expectedProps.inputs.length);
        });
    });
});
