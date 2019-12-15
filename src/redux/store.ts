import {createStore, Store} from 'redux';

import reducer, {IAppState} from './reducer';

let store: Store<IAppState>;

export const initializeStore = (): void => {
    store = createStore(reducer);
};

export const getStore = (): Store<IAppState> => store;

export const getState = (): IAppState => store.getState();

export const dispatchAction = (type, data): void => {
    if (store) {
        store.dispatch({
            data,
            type
        });
    }

    initializeStore();
};
