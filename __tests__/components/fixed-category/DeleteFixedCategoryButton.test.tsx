import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {MutationResult} from '@apollo/react-common';

import {chance} from '../../chance';
import {deleteFixedCategoryMutation} from '../../../src/graphql/mutations';
import {getUserId} from '../../../src/services/auth-service';
import DeleteFixedCategoryButton from '../../../src/components/fixed-category/DeleteFixedCategoryButton';
import * as hooks from '../../../src/utils/hooks';

jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/update-cache-utils');
jest.mock('../../../src/utils/hooks');

describe('DeleteFixedCategoryButton', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useBudgetNavigation} = hooks as jest.Mocked<typeof hooks>;

    let testRenderer,
        testInstance,
        expectedNavigation,
        expectedProps,
        deleteFixedCategory;

    const render = (): void => {
        testRenderer = TestRenderer.create(<DeleteFixedCategoryButton {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        expectedProps = {
            fixedCategoryId: chance.guid()
        };
        deleteFixedCategory = jest.fn();
        expectedNavigation = {
            goBack: jest.fn()
        };

        useMutation.mockReturnValue([deleteFixedCategory, {} as MutationResult]);
        useBudgetNavigation.mockReturnValue(expectedNavigation);

        render();
    });

    it('should call useMutation for delete', () => {
        expect(useMutation).toHaveBeenCalledWith(deleteFixedCategoryMutation, {
            optimisticResponse: {
                deleteFixedCategory: expectedProps.fixedCategoryId
            },
            update: expect.any(Function),
            variables: {
                fixedCategoryId: expectedProps.fixedCategoryId,
                userId: getUserId()
            }
        });
    });

    it('should render a Button', () => {
        const renderedButton = testInstance.findByProps({text: 'Delete'});

        act(() => {
            renderedButton.props.onPress();
        });

        expect(deleteFixedCategory).toHaveBeenCalledTimes(1);
    });
});
