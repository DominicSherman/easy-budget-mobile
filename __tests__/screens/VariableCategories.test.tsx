import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import {ActivityIndicator} from 'react-native';

import VariableCategories from '../../src/screens/VariableCategories';
import DefaultText from '../../src/components/generic/DefaultText';
import {createRandomVariableCategory} from '../models';
import {chance} from '../chance';
import * as authService from '../../src/services/auth-service';

jest.mock('@apollo/react-hooks');
jest.mock('../../src/services/auth-service');

describe('VariableCategories', () => {
    const {useQuery} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {getUserId} = authService as jest.Mocked<typeof authService>;

    let expectedUserId,
        expectedUseQuery: any,
        root: any;

    const render = (): void => {
        root = TestRenderer.create(
            <VariableCategories />
        ).root;
    };

    beforeEach(() => {
        expectedUserId = chance.guid();
        expectedUseQuery = {
            data: {
                variableCategories: chance.n(createRandomVariableCategory, chance.d6())
            },
            loading: false
        };

        getUserId.mockReturnValue(expectedUserId);
        useQuery.mockReturnValue(expectedUseQuery);

        render();
    });

    it('should return an ActivityIndicator when there is no data', () => {
        expectedUseQuery.data = null;
        useQuery.mockReturnValue(expectedUseQuery);

        render();

        root.findByType(ActivityIndicator);
    });

    it('should return an ActivityIndicator when it is loading', () => {
        expectedUseQuery.loading = true;
        useQuery.mockReturnValue(expectedUseQuery);

        render();

        root.findByType(ActivityIndicator);
    });

    it('should render a DefaultText for each fixedExpense', () => {
        expectedUseQuery.data.variableCategories.forEach((variableCategory: any) => {
            const renderedName = root.findByProps({children: variableCategory.name});
            const renderedAmount = root.findByProps({children: variableCategory.amount});

            expect(renderedName.type).toBe(DefaultText);
            expect(renderedAmount.type).toBe(DefaultText);
        });
    });
});
