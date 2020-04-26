import React, {FC} from 'react';
import {Image} from 'react-native';

const RecurringIcon: FC<{isRecurring: boolean}> = ({isRecurring}) =>
    <Image
        resizeMode={'contain'}
        source={isRecurring ?
            require('../../../assets/recurring-icon-selected.png') :
            require('../../../assets/recurring-icon-unselected.png')
        }
        style={{
            height: 36,
            width: 40
        }}
    />;

export default RecurringIcon;
