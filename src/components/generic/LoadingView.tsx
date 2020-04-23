import React from 'react';
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

import {screenWrapper} from '../../styles/shared-styles';
import {Color} from '../../constants/color';

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
