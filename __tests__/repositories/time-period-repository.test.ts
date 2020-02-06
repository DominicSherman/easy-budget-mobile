import * as momentService from '../../src/services/moment-service';
import {chance} from '../chance';
import {getActiveTimePeriod} from '../../src/repositories/time-period-repository';
import * as queryMiddleware from '../../src/repositories/query-middleware';
import {getActiveTimePeriodQuery} from '../../src/graphql/queries';
import {getUserId} from '../../src/services/auth-service';

jest.mock('../../src/services/moment-service');
jest.mock('../../src/services/auth-service');
jest.mock('../../src/repositories/query-middleware');

describe('time period repository', () => {
    const {getRoundedDate} = momentService as jest.Mocked<typeof momentService>;
    const {queryGraphql} = queryMiddleware as jest.Mocked<typeof queryMiddleware>;

    describe('getActiveTimePeriod', () => {
        let expectedDate: string,
            expectedResponse: any;

        beforeEach(() => {
            expectedDate = chance.string();
            expectedResponse = {
                [chance.string()]: chance.string()
            };

            getRoundedDate.mockReturnValue(expectedDate);
            // @ts-ignore
            queryGraphql.mockResolvedValue(expectedResponse);
        });

        it('should query graphql with the correct variables', async () => {
            await getActiveTimePeriod();

            expect(queryGraphql).toHaveBeenCalledTimes(1);
            expect(queryGraphql).toHaveBeenCalledWith({
                fetchPolicy: 'network-only',
                query: getActiveTimePeriodQuery,
                variables: {
                    date: expectedDate,
                    userId: getUserId()
                }
            });
        });
    });
});
