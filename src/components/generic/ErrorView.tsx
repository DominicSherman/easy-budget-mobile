import React, {FC} from 'react';
import {View} from 'react-native';

import {screenWrapper} from '../../styles/shared-styles';

import DefaultText from './DefaultText';

const ErrorView: FC = () =>
    <View style={screenWrapper}>
        <DefaultText>{'Whoops! Something went wrong.'}</DefaultText>
    </View>;

export default ErrorView;
