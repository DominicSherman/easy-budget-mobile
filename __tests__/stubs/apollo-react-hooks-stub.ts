import {chance} from '../chance';

module.exports = {
    useMutation: jest.fn(() => [
        jest.fn(),
        {
            loading: chance.bool()
        }
    ]),
    useQuery: jest.fn()
};
