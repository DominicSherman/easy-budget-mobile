import React, {FC} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {DrawerActions} from '@react-navigation/routers';
import Touchable from 'react-native-platform-touchable';

import {FeatherNames} from '../../enums/IconNames';
import {useBudgetNavigation} from '../../utils/hooks';
import {Route} from '../../enums/Route';
import {Color} from '../../constants/color';

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
    size?: number
}

const Icon: FC<IIcon> = ({name, onPress, size}) =>
    <Touchable
        hitSlop={hitSlop}
        onPress={onPress}
    >
        <Feather
            color={Color.selectedGreen}
            name={name}
            size={size || 25}
            style={iconStyle}
        />
    </Touchable>;

export const HamburgerMenu: FC = () => {
    const navigation = useBudgetNavigation();
    const openDrawer = (): void => navigation.dispatch(DrawerActions.openDrawer());

    return (
        <Icon
            name={FeatherNames.MENU}
            onPress={openDrawer}
        />
    );
};

export const CloseIcon: FC = () => {
    const navigation = useBudgetNavigation();

    return (
        <Icon
            name={FeatherNames.X}
            onPress={navigation.goBack}
        />
    );
};

export const BackButton: FC = () => {
    const navigation = useBudgetNavigation();

    return (
        <Icon
            name={FeatherNames.CHEVRON_LEFT}
            onPress={navigation.goBack}
            size={34}
        />
    );
};

export const InfoIcon: FC = () => {
    const navigation = useBudgetNavigation();
    const onPress = (): void => {
        navigation.navigate({
            name: Route.INFORMATION,
            params: {}
        });
    };

    return (
        <Icon
            name={FeatherNames.INFO}
            onPress={onPress}
        />
    );
};
