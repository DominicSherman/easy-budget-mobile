import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';

import ErrorView from '../../../src/components/generic/ErrorView';
import Button from '../../../src/components/generic/Button';
import {chance} from '../../chance';
import {errorAlert} from '../../../src/services/alert-service';

jest.mock('../../../src/utils/hooks');
jest.mock('../../../src/services/alert-service');

describe('ErrorView', () => {
    let testInstance,
        refetch;

    const render = (): void => {
        const testRenderer = TestRenderer.create(<ErrorView refetch={refetch} />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        refetch = jest.fn();
        render();
    });

    it('should render try again button', async () => {
        const button = testInstance.findByType(Button);

        await act(async () => {
            await button.props.onPress();
        });

        expect(refetch).toHaveBeenCalledTimes(1);
    });

    it('should show an error alert if refetch fails', async () => {
        refetch.mockRejectedValue(new Error(chance.string()));
        render();

        const button = testInstance.findByType(Button);

        await act(async () => {
            await button.props.onPress();
        });

        expect(errorAlert).toHaveBeenCalledTimes(1);
    });
});
