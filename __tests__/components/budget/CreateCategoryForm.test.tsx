import TestRenderer from 'react-test-renderer';
import React from 'react';

import {chance} from '../../chance';
import CreateCategoryForm from '../../../src/components/budget/CreateCategoryForm';
import Button from '../../../src/components/generic/Button';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../src/services/auth-service');

describe('CreateCategoryForm', () => {
    let testRenderer,
        testInstance,
        expectedProps,
        expectedName,
        expectedAmount;

    const render = (): void => {
        testRenderer = TestRenderer.create(<CreateCategoryForm {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        expectedName = chance.string();
        expectedAmount = chance.natural().toString();
        expectedProps = {
            amount: expectedAmount,
            name: expectedName,
            onPress: jest.fn(),
            setAmount: jest.fn(),
            setName: jest.fn()
        };

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render the name input', () => {
        const nameInput = testInstance.findByProps({title: 'Category Name'});

        expect(nameInput.props.onChange).toEqual(expectedProps.setName);
        expect(nameInput.props.value).toEqual(expectedProps.name);
    });

    it('should render the amount input', () => {
        const amountInput = testInstance.findByProps({title: 'Category Amount'});

        expect(amountInput.props.onChange).toEqual(expectedProps.setAmount);
        expect(amountInput.props.value).toEqual(expectedProps.amount);
    });

    it('should render a button', () => {
        const renderedButton = testInstance.findByType(Button);

        expect(renderedButton.props.onPress).toBe(expectedProps.onPress);
    });
});
