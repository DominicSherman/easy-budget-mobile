import {chance} from '../chance';
import {sortByDate, sortByName, sortByPaid} from '../../src/utils/sorting-utils';

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

    describe('sortByDate', () => {
        it('should return 1 if a is first', () => {
            const a = {
                date: `a${chance.string()}`
            };
            const b = {
                date: `b${chance.string()}`
            };

            expect(sortByDate(a, b)).toBe(1);
        });

        it('should return -1 if b is first', () => {
            const a = {
                date: `b${chance.string()}`
            };
            const b = {
                date: `a${chance.string()}`
            };

            expect(sortByDate(a, b)).toBe(-1);
        });
    });

    describe('sortByPaid', () => {
        it('should return 1 if a is paid and b is not', () => {
            expect(sortByPaid({paid: true}, {paid: false})).toBe(1);
        });

        it('should return -1 if a is not paid and b is', () => {
            expect(sortByPaid({paid: false}, {paid: true})).toBe(-1);
        });

        it('should return 0 if they are the same', () => {
            expect(sortByPaid({paid: true}, {paid: true})).toBe(0);
        });
    });
});
