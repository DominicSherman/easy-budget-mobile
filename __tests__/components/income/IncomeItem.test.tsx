import TestRenderer, {act} from 'react-test-renderer';
import * as reactHooks from '@apollo/react-hooks';
import React from 'react';
import {MutationResult} from '@apollo/react-common';

import {createRandomIncomeItem} from '../../models';
import IncomeItem from '../../../src/components/income/IncomeItem';
import CardView from '../../../src/components/generic/CardView';
import EditIncomeItemForm from '../../../src/components/income/EditIncomeItemForm';
import * as hooks from '../../../src/utils/hooks';
import {chance} from '../../chance';
import {Color} from '../../../src/constants/color';

jest.mock('@react-navigation/native');
jest.mock('@apollo/react-hooks');
jest.mock('../../../src/services/animation-service');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');

describe('IncomeItem', () => {
    let root,
        expectedNavigation,
        expectedProps;

    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useBudgetNavigation, useTheme} = hooks as jest.Mocked<typeof hooks>;

    const render = (): void => {
        root = TestRenderer.create(
            <IncomeItem {...expectedProps} />
        ).root;
    };

    beforeEach(() => {
        expectedProps = {
            incomeItem: createRandomIncomeItem()
        };
        expectedNavigation = {
            navigate: jest.fn()
        };

        useBudgetNavigation.mockReturnValue(expectedNavigation);
        useMutation.mockReturnValue([jest.fn(), {} as MutationResult]);
        useTheme.mockReturnValue({
            backgroundColor: chance.pickone(Object.values(Color)),
            textColor: chance.pickone(Object.values(Color))
        });

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render a CardView', () => {
        root.findByType(CardView);
    });

    it('should render a CardView to toggle the edit form', () => {
        const renderedTouchable = root.findByType(CardView);

        act(() => {
            renderedTouchable.props.onPress();
        });

        root.findByType(EditIncomeItemForm);
    });
});
