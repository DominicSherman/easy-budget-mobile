import TestRenderer from 'react-test-renderer';
import React from 'react';
import * as reactRedux from 'react-redux';
import {NavigationNativeContainer} from '@react-navigation/native';

import * as apolloClient from '../src/graphql/apollo-client';
import App from '../src/App';
import {setAppState} from '../src/redux/action-creators';
import {AppStatus} from '../src/enums/AppStatus';
import Login from '../src/screens/Login';
import ErrorView from '../src/components/generic/ErrorView';
import LoadingView from '../src/components/generic/LoadingView';

import {chance} from './chance';

jest.mock('../src/redux/action-creators');
jest.mock('../src/graphql/apollo-client');
jest.mock('@react-navigation/native', () => ({
    DefaultTheme: {
        colors: ['']
    },
    NavigationNativeContainer: (): JSX.Element => <></>
}));
jest.mock('@react-navigation/drawer', () => ({
    createDrawerNavigator: jest.fn(() => ({
        Navigator: (): JSX.Element => <></>,
        Screen: (): JSX.Element => <></>
    }))
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

    it('should render a NavigationNativeContainer if the app status is logged in', () => {
        useSelector.mockReturnValue(AppStatus.LOGGED_IN);
        render();

        root.findByType(NavigationNativeContainer);
    });

    it('should render the Login screen if the app status is logged out', () => {
        useSelector.mockReturnValue(AppStatus.LOGGED_OUT);
        render();

        root.findByType(Login);
    });

    it('should render an ErrorView if the app status error', () => {
        useSelector.mockReturnValue(AppStatus.ERROR);
        render();

        root.findByType(ErrorView);
    });

    it('should render a LoadingView otherwise', () => {
        root.findByType(LoadingView);
    });

    it('should call setAppState', () => {
        expect(setAppState).toHaveBeenCalledWith();
    });
});
