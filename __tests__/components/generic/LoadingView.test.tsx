import TestRenderer from 'react-test-renderer';
import React from 'react';
import LottieView from 'lottie-react-native';

import LoadingView from '../../../src/components/generic/LoadingView';
import * as hooks from '../../../src/utils/hooks';
import { Mode } from '../../../src/enums/Mode';

jest.mock('../../../src/utils/hooks');

describe('LoadingView', () => {
    const {useMode} = hooks as jest.Mocked<typeof hooks>;

    let testInstance;

    const render = (): void => {
        const testRenderer = TestRenderer.create(<LoadingView />);

        testInstance = testRenderer.root;
    };

    it('should render a LottieView on dark mode', () => {
        useMode.mockReturnValue(Mode.DARK);

        render();
        testInstance.findByType(LottieView);
    });

    it('should render a LottieView on light mode', () => {
        useMode.mockReturnValue(Mode.LIGHT);

        render();
        testInstance.findByType(LottieView);
    });
});
