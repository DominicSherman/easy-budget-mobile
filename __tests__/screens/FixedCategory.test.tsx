import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as apolloReactHooks from '@apollo/react-hooks';

import FixedCategory from '../../src/screens/FixedCategory';
import {createRandomFixedCategory, createRandomQueryResult, createRouteProps} from '../models';
import {chance} from '../chance';
import {getFixedCategoryQuery} from '../../src/graphql/queries';
import {getUserId} from '../../src/services/auth-service';
import {getEarlyReturn} from '../../src/services/error-and-loading-service';
import EditFixedCategoryForm from '../../src/components/budget/EditFixedCategoryForm';

jest.mock('@apollo/react-hooks');
jest.mock('../../../src/services/auth-service');

describe('FixedCategory', () => {
    const {useQuery} = apolloReactHooks as jest.Mocked<typeof apolloReactHooks>;

    let root,
        expectedProps,
        expectedQueryResult;

    const render = (): void => {
        root = TestRenderer.create(
            <FixedCategory {...createRouteProps(expectedProps)} />
        ).root;
    };

    beforeEach(() => {
        expectedProps = {
            fixedCategoryId: chance.guid()
        };
        expectedQueryResult = createRandomQueryResult({
            fixedCategory: createRandomFixedCategory()
        });

        useQuery.mockReturnValue(expectedQueryResult);

        render();
    });

    it('should call useQuery', () => {
        expect(useQuery).toHaveBeenCalledTimes(1);
        expect(useQuery).toHaveBeenCalledWith(getFixedCategoryQuery, {
            variables: {
                fixedCategoryId: expectedProps.fixedCategoryId,
                userId: getUserId()
            }
        });
    });

    it('should return early if there is no data', () => {
        expectedQueryResult.data = undefined;
        useQuery.mockReturnValue(expectedQueryResult);
        render();

        const earlyReturn = getEarlyReturn(expectedQueryResult);

        root.findByType(earlyReturn.type);
    });

    it('should render an EditFixedCategoryForm', () => {
        root.findByType(EditFixedCategoryForm);
    });
});
