import React from 'react';
import LottieView from 'lottie-react-native';

import animation from '../../../assets/eb-loader';

export default class LoadingView extends React.PureComponent {
    render(): JSX.Element {
        return (
            <LottieView
                autoPlay
                loop
                source={animation}
            />
        );
    }
}
