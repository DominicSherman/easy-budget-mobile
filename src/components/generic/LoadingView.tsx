import React, {FC} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {screenWrapper} from '../../styles/shared-styles';

const LoadingView: FC = () =>
    <View style={screenWrapper}>
        <ActivityIndicator />
    </View>;

export default LoadingView;
