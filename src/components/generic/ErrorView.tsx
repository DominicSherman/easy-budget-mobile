import React, {FC} from 'react';
import {View} from 'react-native';

import {screenWrapper} from '../../styles/shared-styles';

import {RegularText} from './Text';

const ErrorView: FC = () =>
    <View style={screenWrapper}>
        <RegularText>{'🤒 Whoops! Something went wrong. 🤕'}</RegularText>
    </View>;

export default ErrorView;
