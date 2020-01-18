import {chance} from '../../../__tests__/chance';

const userId = chance.string();
const isSignedIn = chance.bool();

export const getUserId = (): string => userId;

export const getIsSignedIn = (): boolean => isSignedIn;
