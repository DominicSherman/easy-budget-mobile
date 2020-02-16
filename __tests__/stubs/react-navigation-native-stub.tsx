import React from 'react';

import {chance} from '../chance';

module.exports = {
    DefaultTheme: {
        colors: {
            [chance.string()]: chance.string()
        }
    },
    NavigationNativeContainer: (): JSX.Element => <></>,
    useNavigation: jest.fn(() => ({
        goBack: jest.fn(),
        navigate: jest.fn()
    }))
};
