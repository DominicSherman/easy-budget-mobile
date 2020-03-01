import TestRenderer from 'react-test-renderer';
import React from 'react';

import {RootNavigator} from '../../src/screens';
import {AppStatus} from '../../src/enums/AppStatus';
import {Route} from '../../src/enums/Route';

jest.mock('@react-navigation/drawer', () => ({
    createDrawerNavigator: jest.fn(() => ({
        Navigator: (): JSX.Element => <></>,
        Screen: (): JSX.Element => <></>
    }))
}));

describe('screens index', () => {
    let appStatus,
        root;

    const render = (): void => {
        root = TestRenderer.create(
            <RootNavigator appStatus={appStatus} />
        ).root;
    };

    it('should render a stack when app status is LOGGED_IN', () => {
        appStatus = AppStatus.LOGGED_IN;

        render();
    });

    it('should render a stack when app status is LOADING', () => {
        appStatus = AppStatus.LOADING;

        render();
    });

    it('should render a stack when app status is ERROR', () => {
        appStatus = AppStatus.ERROR;

        render();
    });

    it('should render a stack when app status is LOGGED_OUT', () => {
        appStatus = AppStatus.LOGGED_OUT;

        render();
    });
});
