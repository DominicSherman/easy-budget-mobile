import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactHooks from '@apollo/react-hooks';
import * as reactRedux from 'react-redux';

import VariableCategories from '../../src/screens/VariableCategories';
import DefaultText from '../../src/components/generic/DefaultText';
import {createRandomAppState, createRandomQueryResult, createRandomVariableCategories} from '../models';
import {chance} from '../chance';
import {getEarlyReturn} from '../../src/services/error-and-loading-service';

jest.mock('@apollo/react-hooks');
jest.mock('react-redux');
jest.mock('../../src/services/auth-service');

describe('VariableCategories', () => {
    const {useQuery, useMutation} = reactHooks as jest.Mocked<typeof reactHooks>;
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;

    let expectedTimePeriodId,
        expectedData,
        root;

    const render = (): void => {
        root = TestRenderer.create(
            <VariableCategories />
        ).root;
    };

    beforeEach(() => {
        expectedData = createRandomQueryResult({
            variableCategories: createRandomVariableCategories()
        });
        expectedTimePeriodId = chance.guid();

        useQuery.mockReturnValue(expectedData);
        // @ts-ignore
        useMutation.mockReturnValue([jest.fn(), {}]);
        useSelector.mockReturnValue(expectedTimePeriodId);

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call useSelector', () => {
        const expectedState = createRandomAppState();
        const selector = useSelector.mock.calls[0][0](expectedState);

        expect(selector).toBe(expectedState.timePeriodId);
    });

    it('should return early when there is no data', () => {
        expectedData.data = undefined;
        useQuery.mockReturnValue(expectedData);

        render();

        const earlyReturn = getEarlyReturn(expectedData);

        root.findByType(earlyReturn.type);
    });

    it('should render a DefaultText for each fixedExpense', () => {
        expectedData.data.variableCategories.forEach((variableCategory: any) => {
            const renderedName = root.findByProps({children: variableCategory.name});
            const renderedAmount = root.findByProps({children: variableCategory.amount});

            expect(renderedName.type).toBe(DefaultText);
            expect(renderedAmount.type).toBe(DefaultText);
        });
    });
});
