import TestRenderer from 'react-test-renderer';
import React from 'react';
import {Switch} from 'react-native';

import {Mode} from '../../../src/enums/Mode';
import {chance} from '../../chance';
import * as hooks from '../../../src/redux/hooks';
import {AsyncStorageKey} from '../../../src/enums/AsyncStorageKey';
import {dispatchAction} from '../../../src/redux/store';
import {Actions} from '../../../src/redux/actions';
import ModeSelector from '../../../src/components/budget/ModeSelector';

jest.mock('../../../src/redux/hooks');
jest.mock('../../../src/redux/store');

describe('ModeSelector', () => {
    const {useMode} = hooks as jest.Mocked<typeof hooks>;

    let expectedMode,
        AsyncStorage,
        root;

    const render = (): void => {
        root = TestRenderer.create(
            <ModeSelector />
        ).root;
    };

    beforeEach(() => {
        expectedMode = chance.pickone(Object.values(Mode));
        AsyncStorage = require('react-native').AsyncStorage;
        AsyncStorage.setItem = jest.fn();

        useMode.mockReturnValue(expectedMode);

        render();
    });

    it('should render a Switch', async () => {
        const renderedSwitch = root.findByType(Switch);

        expect(renderedSwitch.props.value).toBe(expectedMode === Mode.DARK);

        const expectedBool = chance.bool();
        const expectedNewMode = expectedBool ? Mode.DARK : Mode.LIGHT;

        await renderedSwitch.props.onValueChange(expectedBool);

        expect(dispatchAction).toHaveBeenCalledTimes(1);
        expect(dispatchAction).toHaveBeenCalledWith(Actions.SET_MODE, expectedNewMode);
        expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(AsyncStorageKey.MODE, expectedNewMode);
    });
});
