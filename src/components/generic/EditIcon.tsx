import React, {FC} from 'react';
import {View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Touchable from 'react-native-platform-touchable';

import {FeatherNames} from '../../enums/IconNames';
import {centeredColumn} from '../../styles/shared-styles';
import {useDarkBlueColor} from '../../utils/hooks';

import {TinyText} from './Text';

const hitSlop = {
    bottom: 24,
    left: 24,
    right: 24,
    top: 24
};

interface IEditIconProps {
    isOpen: boolean
    onPress: () => void
}

const EditIcon: FC<IEditIconProps> = ({onPress, isOpen}) =>
    <Touchable
        hitSlop={hitSlop}
        onPress={onPress}
    >
        <View style={[centeredColumn, {width: 36}]}>
            <Feather
                color={useDarkBlueColor()}
                name={isOpen ? FeatherNames.X : FeatherNames.EDIT}
                size={20}
            />
            <TinyText>{isOpen ? 'close' : 'edit'}</TinyText>
        </View>
    </Touchable>;

export default EditIcon;
