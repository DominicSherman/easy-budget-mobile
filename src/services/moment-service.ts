import moment from 'moment';

export const formatTimePeriod = (date: string): string => moment(date).format('MMM Do');

export const formatExpenseDate = (date: string): string => moment(date).format('MMM Do');

export const getRoundedDate = (): string => moment().startOf('h').toISOString();
