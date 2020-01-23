import React from 'react';

const Stack = {
    Navigator: (): JSX.Element => <></>,
    Screen: (): JSX.Element => <></>
};

module.exports = {
    createStackNavigator: jest.fn(() => Stack)
};
