import TestRenderer, {act} from 'react-test-renderer';
import * as reactHooks from '@apollo/react-hooks';
import React from 'react';
import {MutationResult} from '@apollo/react-common';

import {createRandomSavingCategory} from '../../models';
import SavingCategoryItem from '../../../src/components/saving-category/SavingCategoryItem';
import CardView from '../../../src/components/generic/CardView';
import EditIcon from '../../../src/components/generic/EditIcon';
import EditSavingCategoryForm from '../../../src/components/saving-category/EditSavingCategoryForm';
import * as hooks from '../../../src/utils/hooks';
import AddRemoveSavingCategoryForm from '../../../src/components/saving-category/AddRemoveSavingCategoryForm';
import {chance} from '../../chance';
import {Color} from '../../../src/constants/color';
import {Mode} from '../../../src/enums/Mode';

jest.mock('@react-navigation/native');
jest.mock('@apollo/react-hooks');
jest.mock('../../../src/services/animation-service');
jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/hooks');

describe('SavingCategoryItem', () => {
    let root,
        expectedNavigation,
        updateCategory,
        expectedProps;

    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useBudgetNavigation, useTheme, useMode} = hooks as jest.Mocked<typeof hooks>;

    const render = (): void => {
        root = TestRenderer.create(
            <SavingCategoryItem {...expectedProps} />
        ).root;
    };

    beforeEach(() => {
        expectedProps = {
            savingCategory: createRandomSavingCategory()
        };
        updateCategory = jest.fn();
        expectedNavigation = {
            navigate: jest.fn()
        };

        useBudgetNavigation.mockReturnValue(expectedNavigation);
        useMutation.mockReturnValue([updateCategory, {} as MutationResult]);
        useTheme.mockReturnValue({
            backgroundColor: chance.pickone(Object.values(Color)),
            textColor: chance.pickone(Object.values(Color))
        });
        useMode.mockReturnValue(chance.pickone(Object.values(Mode)));

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render a card view to toggle the edit form', () => {
        const renderedTouchable = root.findByType(CardView);

        act(() => {
            renderedTouchable.props.onPress();
        });

        const renderedForm = root.findByType(EditSavingCategoryForm);

        act(() => {
            renderedForm.props.toggleExpanded();
        });

        expect(root.findAllByType(EditSavingCategoryForm)).toHaveLength(0);
    });

    it('should render a plus icon to toggle the add form', () => {
        const renderedTouchable = root.findByProps({testID: 'remove'});

        act(() => {
            renderedTouchable.props.onPress();
        });

        const renderedForm = root.findByType(AddRemoveSavingCategoryForm);

        act(() => {
            renderedForm.props.toggleExpanded();
        });

        expect(root.findAllByType(AddRemoveSavingCategoryForm)).toHaveLength(0);
    });

    it('should render a minus icon to toggle the add form', () => {
        const renderedTouchable = root.findByProps({testID: 'plus'});

        act(() => {
            renderedTouchable.props.onPress();
        });

        const renderedForm = root.findByType(AddRemoveSavingCategoryForm);

        act(() => {
            renderedForm.props.toggleExpanded();
        });

        expect(root.findAllByType(AddRemoveSavingCategoryForm)).toHaveLength(0);
    });
});
