import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/routers';

import {FeatherNames} from '../../enums/icon-names';
import {colors} from '../../constants/colors';

const iconStyle = {
    color: colors.darkerGray,
    marginLeft: 16
};

export const HamburgerMenu: FC = () => {
    const navigation = useNavigation();
    const openDrawer = (): void => navigation.dispatch(DrawerActions.openDrawer());

    return (
        <Feather
            name={FeatherNames.MENU}
            onPress={openDrawer}
            size={25}
            style={iconStyle}
        />
    );
};
