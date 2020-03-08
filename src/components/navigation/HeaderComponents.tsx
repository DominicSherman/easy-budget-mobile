import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/routers';
import Touchable from 'react-native-platform-touchable';

import {FeatherNames} from '../../enums/IconNames';
import {usePrimaryColor} from '../../redux/hooks';
import {Route} from '../../enums/Route';

const iconStyle = {
    marginHorizontal: 16
};

const hitSlop = {
    bottom: 24,
    left: 24,
    right: 24,
    top: 24
};

interface IIcon {
    name: string
    onPress: () => void
}

const Icon: FC<IIcon> = ({name, onPress}) =>
    <Touchable
        hitSlop={hitSlop}
        onPress={onPress}
    >
        <Feather
            color={usePrimaryColor()}
            name={name}
            size={25}
            style={iconStyle}
        />
    </Touchable>;

export const HamburgerMenu: FC = () => {
    const navigation = useNavigation();
    const openDrawer = (): void => navigation.dispatch(DrawerActions.openDrawer());

    return (
        <Icon
            name={FeatherNames.MENU}
            onPress={openDrawer}
        />
    );
};

export const CloseIcon: FC = () => {
    const navigation = useNavigation();

    return (
        <Icon
            name={FeatherNames.X}
            onPress={navigation.goBack}
        />
    );
};

export const InfoIcon: FC = () => {
    const navigation = useNavigation();
    const onPress = (): void => {
        navigation.navigate({
            name: Route.INFORMATION,
            params: undefined
        });
    };

    return (
        <Icon
            name={FeatherNames.INFO}
            onPress={onPress}
        />
    );
};
