import React, {FC} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {screenWrapper} from '../../styles/shared-styles';
import {usePrimaryColor} from '../../redux/hooks';

const LoadingView: FC = () =>
    <View style={screenWrapper}>
        <ActivityIndicator color={usePrimaryColor()} />
    </View>;

export default LoadingView;
