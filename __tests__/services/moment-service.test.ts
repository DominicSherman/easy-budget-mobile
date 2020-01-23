import moment from 'moment';

import {formatExpenseDate, formatTimePeriod, getRoundedDate} from '../../src/services/moment-service';
import {chance} from '../chance';

describe('moment service', () => {
    let expectedDate;

    beforeEach(() => {
        expectedDate = chance.date().toISOString();
    });

    it('should formatTimePeriod', () => {
        expect(formatTimePeriod(expectedDate)).toBe(moment(expectedDate).format('MMM Do'));
    });

    it('should formatExpenseDate', () => {
        expect(formatExpenseDate(expectedDate)).toBe(moment(expectedDate).format('MMM Do'));
    });

    it('should getRoundedDate', () => {
        expect(getRoundedDate()).toBe(moment().startOf('h').toISOString());
    });
});
