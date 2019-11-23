import {IVariableCategory} from '../src/types/global';

import {chance} from './chance';

export const createRandomVariableCategory = (variableCategory = {}): IVariableCategory => ({
    amount: chance.natural(),
    name: chance.string(),
    userId: chance.guid(),
    variableCategoryId: chance.guid(),
    ...variableCategory
});
