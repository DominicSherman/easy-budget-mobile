import {chance} from '../../../__tests__/chance';

const userId = chance.string();

export const getUserId = (): string => userId;

export const getIsSignedIn = jest.fn();
