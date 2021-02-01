import {Provider} from 'react-redux';

import App from '../src/App';

jest.mock('@react-navigation/drawer', () => ({
    createDrawerNavigator: jest.fn()
}));
jest.mock('../src/StacksOnStacksOnStacks', () => ({
    RootNavigator: jest.fn(() => null)
}));

describe('index', () => {
    let AppRegistry;

    beforeEach(() => {
        AppRegistry = require('react-native').AppRegistry;
        AppRegistry.registerComponent = jest.fn();

        require('../index');
    });

    it('should call AppRegistry', () => {
        expect(AppRegistry.registerComponent).toHaveBeenCalledTimes(1);
        expect(AppRegistry.registerComponent).toHaveBeenCalledWith('EasyBudget', expect.any(Function));

        const renderedComponent = AppRegistry.registerComponent.mock.calls[0][1]()();

        expect(renderedComponent.type).toBe(Provider);
        expect(renderedComponent.props.children.type).toBe(App);
    });
});
