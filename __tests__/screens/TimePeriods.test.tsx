import React from 'react';
import {render, RenderResult} from '@testing-library/react-native';
import * as apolloHooks from '@apollo/react-hooks';

import TimePeriods from '../../src/screens/TimePeriods';
import {createRandomQueryResult, createRandomTimePeriods} from '../models';
import {getTimePeriodsQuery} from '../../src/graphql/queries';
import {GetTimePeriods} from '../../autogen/GetTimePeriods';
import {GetTimePeriod} from '../../autogen/GetTimePeriod';
import * as hooks from '../../src/utils/hooks';
import {chance} from '../chance';
import {Mode} from '../../src/enums/Mode';
import {getFormattedTimePeriodText} from '../../src/utils/utils';

jest.mock('@apollo/react-hooks');

jest.mock('../../src/utils/hooks');
jest.mock('../../src/services/auth-service');

describe('TimePeriods', () => {
    const {useQuery} = apolloHooks as jest.Mocked<typeof apolloHooks>;
    const {useMode} = hooks as jest.Mocked<typeof hooks>;

    let testInstance: RenderResult,
        expectedData;

    const renderComponent = (): void => {
        testInstance = render(<TimePeriods />);
    };

    beforeEach(() => {
        expectedData = {
            timePeriods: createRandomTimePeriods()
        };
        useMode.mockReturnValue(chance.pickone(Object.values(Mode)));

        // @ts-ignore
        useQuery.mockImplementation((query, options) => {
            if (query === getTimePeriodsQuery) {
                return createRandomQueryResult<GetTimePeriods>(expectedData);
            }

            // @ts-ignore
            const timePeriodId = options!.variables!.timePeriodId;
            const data = {
                timePeriod: expectedData.timePeriods.find((t) => t.timePeriodId === timePeriodId)
            };

            return createRandomQueryResult<GetTimePeriod>(data);
        });

        renderComponent();
    });

    it('should render the time periods formatted text', () => {
        const formattedText = getFormattedTimePeriodText(chance.pickone(expectedData.timePeriods));

        testInstance.getByText(formattedText);
    });
});
