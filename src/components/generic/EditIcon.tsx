import React, {FC} from 'react';
import {View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Touchable from 'react-native-platform-touchable';

import {FeatherNames} from '../../enums/IconNames';
import {centeredColumn} from '../../styles/shared-styles';

import {SmallText} from './Text';

const hitSlop = {
    bottom: 24,
    left: 24,
    right: 24,
    top: 24
};

interface IEditIconProps {
    color?: string
    isOpen: boolean
    onPress: () => void
}

const EditIcon: FC<IEditIconProps> = ({onPress, color, isOpen}) =>
    <Touchable
        hitSlop={hitSlop}
        onPress={onPress}
    >
        <View style={[centeredColumn, {width: 36}]}>
            <Feather
                color={color}
                name={isOpen ? FeatherNames.X : FeatherNames.EDIT}
                size={20}
            />
            <SmallText>{isOpen ? 'close' : 'edit'}</SmallText>
        </View>
    </Touchable>;

export default EditIcon;
