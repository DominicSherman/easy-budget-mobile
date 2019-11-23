import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import {ApolloProvider} from '@apollo/react-hooks';

import * as apolloClient from '../../src/graphql/apollo-client';
import {chance} from '../chance';
import Home from '../../src/screens/Home';
import VariableCategories from '../../src/screens/VariableCategories';
import FixedCategories from '../../src/screens/FixedCategories';
import {asScreen} from '../../src/services/screen-wrapper';

jest.mock('../../src/graphql/apollo-client');
jest.mock('../../src/screens/Home');
jest.mock('../../src/screens/VariableCategories');
jest.mock('../../src/screens/FixedCategories');

describe('screen wrapper', () => {
    const {getApolloClient} = apolloClient as jest.Mocked<typeof apolloClient>;

    let expectedClient,
        expectedComponent;

    beforeEach(() => {
        expectedClient = chance.string();
        expectedComponent = chance.pickone([
            Home,
            VariableCategories,
            FixedCategories
        ]);

        getApolloClient.mockReturnValue(expectedClient);
    });

    it('should call getApolloClient', () => {
        const Component = asScreen(expectedComponent);

        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<Component />);

        expect(getApolloClient).toHaveBeenCalledTimes(1);
    });

    it('should render ApolloProvider', () => {
        const Component = asScreen(expectedComponent);

        const shallowRenderer = ShallowRenderer.createRenderer();

        shallowRenderer.render(<Component />);

        const renderedComponent = shallowRenderer.getRenderOutput();

        expect(renderedComponent.type).toBe(ApolloProvider);
        expect(renderedComponent.props.client).toBe(expectedClient);
    });
});
