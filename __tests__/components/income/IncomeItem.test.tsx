import TestRenderer, {act} from 'react-test-renderer';
import * as reactHooks from '@apollo/react-hooks';
import React from 'react';
import {MutationResult} from '@apollo/react-common';

import {createRandomIncomeItem} from '../../models';
import IncomeItem from '../../../src/components/income/IncomeItem';
import CardView from '../../../src/components/generic/CardView';
import EditIcon from '../../../src/components/generic/EditIcon';
import EditIncomeItemForm from '../../../src/components/income/EditIncomeItemForm';
import * as hooks from '../../../src/utils/hooks';

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
    const {useBudgetNavigation} = hooks as jest.Mocked<typeof hooks>;

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

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render a CardView', () => {
        const renderedCardView = root.findByType(CardView);

        expect(renderedCardView.props.disabled).toBe(true);
    });

    it('should render an edit icon to toggle the edit form', () => {
        const renderedTouchable = root.findByType(EditIcon);

        act(() => {
            renderedTouchable.props.onPress();
        });

        root.findByType(EditIncomeItemForm);
    });
});
