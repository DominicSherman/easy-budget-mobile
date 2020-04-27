import React, {FC} from 'react';
import {View} from 'react-native';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants/dimensions';
import {useShockBlueColor} from '../../utils/hooks';

export const HEADER_HEIGHT = SCREEN_HEIGHT * 0.22;

const BackgroundHeader: FC = () =>
    <View
        style={{
            backgroundColor: useShockBlueColor(),
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            height: HEADER_HEIGHT,
            position: 'absolute',
            top: 0,
            width: SCREEN_WIDTH,
            zIndex: -1
        }}
    />;

export default BackgroundHeader;
