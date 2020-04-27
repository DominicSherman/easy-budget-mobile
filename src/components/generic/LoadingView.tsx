import React from 'react';
import LottieView from 'lottie-react-native';

// eslint-disable-next-line import/extensions
import animation from '../../../assets/eb-loader.json';

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
