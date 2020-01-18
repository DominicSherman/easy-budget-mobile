import moment from 'moment';

export const formatTimePeriod = (date): string => moment(date).format('MMM Do');

export const getRoundedDate = (): string => moment().startOf('h').toISOString();
