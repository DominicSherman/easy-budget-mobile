import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/routers';
import Touchable from 'react-native-platform-touchable';

import {FeatherNames} from '../../enums/icon-names';
import {usePrimaryColor} from '../../redux/hooks';

const iconStyle = {
    marginLeft: 16
};

const hitSlop = {
    bottom: 24,
    left: 24,
    right: 24,
    top: 24
};

export const HamburgerMenu: FC = () => {
    const navigation = useNavigation();
    const openDrawer = (): void => navigation.dispatch(DrawerActions.openDrawer());

    return (
        <Touchable
            hitSlop={hitSlop}
            onPress={openDrawer}
        >
            <Feather
                color={usePrimaryColor()}
                name={FeatherNames.MENU}
                size={25}
                style={iconStyle}
            />
        </Touchable>
    );
};

export const CloseIcon: FC = () => {
    const navigation = useNavigation();

    return (
        <Touchable
            hitSlop={hitSlop}
            onPress={navigation.goBack}
        >
            <Feather
                color={usePrimaryColor()}
                name={FeatherNames.X}
                size={25}
                style={iconStyle}
            />
        </Touchable>
    );
};
