import {createStore, Store} from 'redux';

import reducer, {IAppState} from './reducer';
import {Actions} from './actions';

let store: Store<IAppState>;

export const resetStore = (): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    store = null;
};

export const initializeStore = (): void => {
    if (!store) {
        store = createStore(reducer);
    }
};

export const getStore = (): Store<IAppState> => store;

export const getState = (): IAppState => store.getState();

export const dispatchAction = (type: Actions, data: any): void => {
    initializeStore();

    store.dispatch({
        data,
        type
    });
};
