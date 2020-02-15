import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/routers';

import {FeatherNames} from '../../enums/icon-names';
import {usePrimaryColor} from '../../redux/hooks';

const iconStyle = {
    marginLeft: 16
};

export const HamburgerMenu: FC = () => {
    const navigation = useNavigation();
    const openDrawer = (): void => navigation.dispatch(DrawerActions.openDrawer());

    return (
        <Feather
            color={usePrimaryColor()}
            name={FeatherNames.MENU}
            onPress={openDrawer}
            size={25}
            style={iconStyle}
        />
    );
};

export const CloseIcon: FC = () => {
    const navigation = useNavigation();

    return (
        <Feather
            color={usePrimaryColor()}
            name={FeatherNames.X}
            onPress={navigation.goBack}
            size={25}
            style={iconStyle}
        />
    );
};
