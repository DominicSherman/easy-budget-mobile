// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/extensions */
import React, {FC} from 'react';
import LottieView from 'lottie-react-native';

import darkModeAnimation from '../../../assets/loading-dark.json';
import lightModeAnimation from '../../../assets/loading-light.json';
import {useMode, useSecondaryBackgroundColor} from '../../utils/hooks';
import {Mode} from '../../enums/Mode';

const LoadingView: FC = () => {
    const mode = useMode();
    const source = mode === Mode.DARK ? darkModeAnimation : lightModeAnimation;

    return (
        <LottieView
            autoPlay
            loop
            source={source}
            style={{backgroundColor: useSecondaryBackgroundColor()}}
        />
    );
};

export default LoadingView;
