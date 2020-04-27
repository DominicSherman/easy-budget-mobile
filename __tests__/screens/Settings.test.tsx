import TestRenderer from 'react-test-renderer';
import React from 'react';
import {Image, SafeAreaView} from 'react-native';

import * as hooks from '../../src/utils/hooks';
import Settings from '../../src/screens/Settings';
import {createRandomUserInformation} from '../models';
import {Mode} from '../../src/enums/Mode';

jest.mock('react-redux');
jest.mock('../../src/utils/hooks');

describe('Settings', () => {
    const {useUserInformation, useMode} = hooks as jest.Mocked<typeof hooks>;

    let root;

    const render = (): void => {
        root = TestRenderer.create(<Settings />).root;
    };

    beforeEach(() => {
        useUserInformation.mockReturnValue(createRandomUserInformation());
    });

    it('should render a safe area view', () => {
        render();

        root.findByType(SafeAreaView);
    });

    it('should render an image with the right source for DARK', () => {
        useMode.mockReturnValue(Mode.DARK);
        render();

        const renderedImage = root.findAllByType(Image)[1];

        expect(renderedImage.props.source).toBe(require('../../assets/settings-robot-dark.png'));
    });

    it('should render an image with the right source for LIGHT', () => {
        useMode.mockReturnValue(Mode.LIGHT);
        render();

        const renderedImage = root.findAllByType(Image)[1];

        expect(renderedImage.props.source).toBe(require('../../assets/settings-robot-light.png'));
    });
});
