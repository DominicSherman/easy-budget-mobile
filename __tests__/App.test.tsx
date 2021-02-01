import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactRedux from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import * as apolloClient from '../src/graphql/apollo-client';
import App from '../src/App';
import {setAppState} from '../src/redux/action-creators';
import {AppStatus} from '../src/enums/AppStatus';

import {chance} from './chance';

jest.mock('../src/redux/action-creators');
jest.mock('../src/graphql/apollo-client');
jest.mock('@react-navigation/native', () => ({
    DefaultTheme: {
        colors: ['']
    },
    NavigationContainer: (): JSX.Element => <></>
}));
jest.mock('@react-navigation/drawer', () => ({
    createDrawerNavigator: jest.fn(() => ({
        Navigator: (): JSX.Element => <></>,
        Screen: (): JSX.Element => <></>
    }))
}));
jest.mock('../src/StacksOnStacksOnStacks', () => ({
    RootNavigator: jest.fn(() => null)
}));
jest.mock('react-redux');

describe('App', () => {
    const {useSelector} = reactRedux as jest.Mocked<typeof reactRedux>;
    const {getApolloClient} = apolloClient as jest.Mocked<typeof apolloClient>;

    let root;

    const render = (): void => {
        root = TestRenderer.create(<App />).root;
    };

    beforeEach(() => {
        useSelector.mockReturnValue(chance.string());
        // @ts-ignore
        getApolloClient.mockReturnValue(chance.string());

        render();
    });

    it('should render a NavigationContainer', () => {
        useSelector.mockReturnValue(AppStatus.LOGGED_IN);
        render();

        root.findByType(NavigationContainer);
    });

    it('should call setAppState', () => {
        expect(setAppState).toHaveBeenCalledWith();
    });
});
