import TestRenderer from 'react-test-renderer';
import * as reactHooks from '@apollo/react-hooks';
import React from 'react';
import {MutationResult} from '@apollo/react-common';
import {Switch} from 'react-native';

import FixedCategories from '../../../src/screens/FixedCategories';
import {createRandomFixedCategory} from '../../models';
import {updateFixedCategoryMutation} from '../../../src/graphql/mutations';
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
                    userId: expectedProps.fixedCategory.userId
                }
            }
        });
    });
});
