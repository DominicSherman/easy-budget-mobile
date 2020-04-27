import React from 'react';
import {render, RenderResult} from '@testing-library/react-native';

import * as hooks from '../../../src/utils/hooks';
import BrowsingHeader from '../../../src/components/time-period/BrowsingHeader';
import {createRandomTimePeriod} from '../../models';
import {TimePeriodType} from '../../../src/redux/reducer';
import {chance} from '../../chance';

jest.mock('../../../src/utils/hooks');

describe('BrowsingHeader', () => {
    const {useTimePeriod} = hooks as jest.Mocked<typeof hooks>;

    let timePeriod,
        testInstance: RenderResult;

    const renderComponent = (): void => {
        testInstance = render(<BrowsingHeader />);
    };

    it('should show the right text if the time period is not active', () => {
        timePeriod = createRandomTimePeriod({type: chance.pickone([TimePeriodType.PREVIOUS, TimePeriodType.UPCOMING])});
        useTimePeriod.mockReturnValue(timePeriod);
        renderComponent();

        testInstance.getByText('You are currently browsing');
    });

    it('should return null if there is no timePeriod', () => {
        useTimePeriod.mockReturnValue(null);
        renderComponent();

        expect(testInstance.queryByText('You are currently browsing')).toBeNull();
    });

    it('should return null if the time period is active', () => {
        timePeriod = createRandomTimePeriod({type: TimePeriodType.ACTIVE});
        useTimePeriod.mockReturnValue(timePeriod);
        renderComponent();

        expect(testInstance.queryByText('You are currently browsing')).toBeNull();
    });
});
