import React from 'react';
import LottieView from 'lottie-react-native';

export default class LoadingView extends React.PureComponent {
    render(): JSX.Element {
        return (
            <LottieView
                autoPlay
                loop
                source={require('../../../assets/eb-loader.json')}
            />
        );
    }
}
