import TestRenderer from 'react-test-renderer';
import * as reactHooks from '@apollo/react-hooks';

import FixedCategories from '../../../src/screens/FixedCategories';
import React from 'react';
import {createRandomFixedCategory} from '../../models';
import {MutationResult} from '@apollo/react-common';
import {updateFixedCategoryMutation} from '../../../src/graphql/mutations';
import {Switch} from 'react-native';
import {chance} from '../../chance';

jest.mock('@apollo/react-hooks');

describe('FixedCategoryItem', () => {
    let root,
        updateCategory,
        expectedProps;

    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;

    const render = (): void => {
        root = TestRenderer.create(
            <FixedCategories {...expectedProps} />
        ).root;
    };

    beforeEach(() => {
        expectedProps = {
            fixedCategory: createRandomFixedCategory()
        };

        useMutation.mockReturnValue([updateCategory, {} as MutationResult]);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call useMutation', () => {
        expect(useMutation).toHaveBeenCalledTimes(1);
        expect(useMutation).toHaveBeenCalledWith(updateFixedCategoryMutation);
    });

    it('should call updateFixedCategory onValueChange', () => {
        const renderedSwitch = root.findByType(Switch);
        const paid = chance.bool();

        renderedSwitch.props.onValueChange(paid);

        expect(updateCategory).toHaveBeenCalledTimes(1);
        expect(updateCategory).toHaveBeenCalledWith({
            optimisticResponse: {
                updateFixedCategory: {
                    ...expectedProps.fixedCategory,
                    paid
                }
            },
            variables: {
                fixedCategory: {
                    fixedCategoryId: expectedProps.fixedCategory.fixedCategoryId,
                    paid,
                    userId: expectedProps.fixedCategory.userId,
                }
            }
        });
    });
});
