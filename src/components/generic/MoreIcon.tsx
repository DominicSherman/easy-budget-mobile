import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Touchable from 'react-native-platform-touchable';

import {FeatherNames} from '../../enums/IconNames';
import {useDarkBlueColor} from '../../utils/hooks';

const hitSlop = {
    bottom: 24,
    left: 24,
    right: 24,
    top: 24
};

interface IMoreIconProps {
    onPress: () => void
}

const MoreIcon: FC<IMoreIconProps> = ({onPress}) =>
    <Touchable
        hitSlop={hitSlop}
        onPress={onPress}
    >
        <Feather
            color={useDarkBlueColor()}
            name={FeatherNames.CHEVRON_RIGHT}
            size={35}
        />
    </Touchable>;

export default MoreIcon;
