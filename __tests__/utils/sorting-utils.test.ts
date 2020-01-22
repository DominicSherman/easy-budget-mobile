import {chance} from '../chance';
import {sortByName} from '../../src/utils/sorting-utils';

describe('sorting utils', () => {
    describe('sortByName', () => {
        it('should return -1 if a is first', () => {
            const a = {
                name: `a${chance.string()}`
            };
            const b = {
                name: `b${chance.string()}`
            };

            expect(sortByName(a, b)).toBe(-1);
        });

        it('should return 1 if b is first', () => {
            const a = {
                name: `b${chance.string()}`
            };
            const b = {
                name: `a${chance.string()}`
            };

            expect(sortByName(a, b)).toBe(1);
        });
    });
});
