import TestRenderer, {act} from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactNavigation from '@react-navigation/native';
import {MutationResult} from '@apollo/react-common';

import {chance} from '../../chance';
import {deleteVariableCategoryMutation} from '../../../src/graphql/mutations';
import {getUserId} from '../../../src/services/auth-service';
import DeleteVariableCategoryButton from '../../../src/components/variable-category/DeleteVariableCategoryButton';

jest.mock('../../../src/services/auth-service');
jest.mock('../../../src/utils/update-cache-utils');
jest.mock('../../../src/utils/hooks');

describe('DeleteVariableCategoryButton', () => {
    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useNavigation} = reactNavigation as jest.Mocked<typeof reactNavigation>;

    let testRenderer,
        testInstance,
        expectedNavigation,
        expectedProps,
        deleteVariableCategory;

    const render = (): void => {
        testRenderer = TestRenderer.create(<DeleteVariableCategoryButton {...expectedProps} />);

        testInstance = testRenderer.root;
    };

    beforeEach(() => {
        expectedProps = {
            variableCategoryId: chance.guid()
        };
        deleteVariableCategory = jest.fn();
        expectedNavigation = {
            goBack: jest.fn()
        };

        useMutation.mockReturnValue([deleteVariableCategory, {} as MutationResult]);
        useNavigation.mockReturnValue(expectedNavigation);

        render();
    });

    it('should call useMutation for delete', () => {
        expect(useMutation).toHaveBeenCalledWith(deleteVariableCategoryMutation, {
            optimisticResponse: {
                deleteVariableCategory: expectedProps.variableCategoryId
            },
            update: expect.any(Function),
            variables: {
                userId: getUserId(),
                variableCategoryId: expectedProps.variableCategoryId
            }
        });
    });

    it('should render a Button', () => {
        const renderedButton = testInstance.findByProps({text: 'Delete'});

        act(() => {
            renderedButton.props.onPress();
        });

        expect(deleteVariableCategory).toHaveBeenCalledTimes(1);
    });
});
