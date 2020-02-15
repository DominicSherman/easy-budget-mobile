import TestRenderer from 'react-test-renderer';
import * as reactHooks from '@apollo/react-hooks';
import React from 'react';
import {MutationResult} from '@apollo/react-common';
import Touchable from 'react-native-platform-touchable';
import * as reactNavigationNative from '@react-navigation/native';

import {createRandomFixedCategory} from '../../models';
import {updateFixedCategoryMutation} from '../../../src/graphql/mutations';
import FixedCategoryItem from '../../../src/components/budget/FixedCategoryItem';
import CardView from '../../../src/components/generic/CardView';
import {Route} from '../../../src/enums/Route';

jest.mock('@react-navigation/native');
jest.mock('@apollo/react-hooks');

describe('FixedCategoryItem', () => {
    let root,
        expectedNavigation,
        updateCategory,
        expectedProps;

    const {useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useNavigation} = reactNavigationNative as jest.Mocked<typeof reactNavigationNative>;

    const render = (): void => {
        root = TestRenderer.create(
            <FixedCategoryItem {...expectedProps} />
        ).root;
    };

    beforeEach(() => {
        expectedProps = {
            fixedCategory: createRandomFixedCategory()
        };
        updateCategory = jest.fn();
        expectedNavigation = {
            navigate: jest.fn()
        };

        useNavigation.mockReturnValue(expectedNavigation);
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

    it('should render a CardView', () => {
        const renderedCardView = root.findByType(CardView);

        renderedCardView.props.onPress();

        expect(expectedNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(expectedNavigation.navigate).toHaveBeenCalledWith({
            name: Route.FIXED_CATEGORY,
            params: {
                fixedCategoryId: expectedProps.fixedCategory.fixedCategoryId
            }
        });
    });

    it('should render the note if there is one', () => {
        root.findByProps({children: expectedProps.fixedCategory.note});
    });

    it('should **not** render the note if there is not one', () => {
        expectedProps.fixedCategory.note = null;
        render();

        expect(root.findAllByProps({children: expectedProps.fixedCategory.note})).toEqual([]);
    });

    it('should call updateFixedCategory onValueChange', () => {
        const renderedTouchable = root.findAllByType(Touchable)[1];

        renderedTouchable.props.onPress();

        expect(updateCategory).toHaveBeenCalledTimes(1);
        expect(updateCategory).toHaveBeenCalledWith({
            optimisticResponse: {
                updateFixedCategory: {
                    ...expectedProps.fixedCategory,
                    paid: !expectedProps.fixedCategory.paid
                }
            },
            variables: {
                fixedCategory: {
                    fixedCategoryId: expectedProps.fixedCategory.fixedCategoryId,
                    paid: !expectedProps.fixedCategory.paid,
                    userId: expectedProps.fixedCategory.userId
                }
            }
        });
    });
});
