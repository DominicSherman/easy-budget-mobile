import {getEarlyReturn} from '../../src/services/error-and-loading-service';
import LoadingView from '../../src/components/LoadingView';
import ErrorView from '../../src/components/ErrorView';

describe('error and loading service', () => {
    describe('getEarlyReturn', () => {
        it('should return LoadingView if loading is true', () => {
            // @ts-ignore
            const actualValue = getEarlyReturn({loading: true});

            expect(actualValue.type).toBe(LoadingView);
        });

        it('should return ErrorView if loading is **not** true', () => {
            // @ts-ignore
            const actualValue = getEarlyReturn({});

            expect(actualValue.type).toBe(ErrorView);
        });
    });
});
