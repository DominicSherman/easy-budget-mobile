import moment from 'moment';

import {IExpense} from '../../autogen/IExpense';
import {ITimePeriod} from '../../autogen/ITimePeriod';
import {formatTimePeriod} from '../services/moment-service';

export const calculateTotal = (expenses: IExpense[]): number => expenses.reduce((total, expense) => total + expense.amount, 0);

export const getFormattedTimePeriodText = (timePeriod: ITimePeriod): string =>
    `${formatTimePeriod(timePeriod.beginDate)} - ${formatTimePeriod(moment(timePeriod.endDate).toISOString())} (${moment(timePeriod.endDate).diff(moment(timePeriod.beginDate), 'd')} days)`;
