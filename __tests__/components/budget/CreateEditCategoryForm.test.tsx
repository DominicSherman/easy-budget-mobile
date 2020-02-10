import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

import {chance} from '../../chance';
import CreateEditCategoryForm from '../../../src/components/budget/CreateEditCategoryForm';
import Button from '../../../src/components/generic/Button';
import Input from '../../../src/components/generic/Input';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/services/animation-service');

describe('CreateEditCategoryForm', () => {
    let testRenderer,
        testInstance,
        expectedProps,
        expectedName,
        expectedAmount;

    const render = (): void => {
        testRenderer = TestRenderer.create(<CreateEditCategoryForm {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();
        expectedProps = {
            amount: expectedAmount,
            headerText: chance.string(),
            name: expectedName,
            onPress: jest.fn(),
            setAmount: jest.fn(),
            setName: jest.fn(),
            toggleable: false
        };

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render the name input', () => {
        const nameInput = testInstance.findByProps({title: 'Category Name *'});

        expect(nameInput.props.onChange).toEqual(expectedProps.setName);
        expect(nameInput.props.value).toEqual(expectedProps.name);
    });

    it('should render the amount input', () => {
        const amountInput = testInstance.findByProps({title: 'Category Amount *'});

        expect(amountInput.props.onChange).toEqual(expectedProps.setAmount);
        expect(amountInput.props.value).toEqual(expectedProps.amount);
    });

    it('should render the note input if it is passed', () => {
        expectedProps = {
            ...expectedProps,
            note: chance.string(),
            setNote: jest.fn()
        };
        render();

        const noteInput = testInstance.findByProps({title: 'Note'});

        expect(noteInput.props.onChange).toEqual(expectedProps.setNote);
        expect(noteInput.props.value).toEqual(expectedProps.note);
    });

    it('should render an icon to toggle when toggleable', () => {
        expectedProps.toggleable = true;
        render();

        const renderedIcon = testInstance.findByType(Feather);

        act(() => {
            renderedIcon.props.onPress();
        });

        expect(testInstance.findAllByType(Input)).toHaveLength(2);
    });

    it('should render a button', () => {
        const renderedButton = testInstance.findByType(Button);

        expect(renderedButton.props.onPress).toBe(expectedProps.onPress);
    });

    it('should pass disabled as true if there is no name', () => {
        expectedProps.name = '';
        render();

        const renderedButton = testInstance.findByType(Button);

        expect(renderedButton.props.disabled).toBe(true);
    });

    it('should pass disabled as true if there is no amount', () => {
        expectedProps.amount = '';
        render();

        const renderedButton = testInstance.findByType(Button);

        expect(renderedButton.props.disabled).toBe(true);
    });
});
