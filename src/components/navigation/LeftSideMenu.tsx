import React, {FC} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/routers';

import {Route} from '../../enums/Route';
import {useBudgetNavigation} from '../../utils/hooks';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Color} from '../../constants/color';
import {LargeText} from '../generic/Text';

const items = [
    {
        iconName: 'home',
        label: 'Home',
        route: Route.HOME
    },
    {
        iconName: 'home',
        label: 'Home',
        route: Route.HOME
    },
    {
        iconName: 'home',
        label: 'Home',
        route: Route.HOME
    },
    {
        iconName: 'home',
        label: 'Home',
        route: Route.HOME
    },
    {
        iconName: 'home',
        label: 'Home',
        route: Route.HOME
    },
    {
        iconName: 'home',
        label: 'Home',
        route: Route.HOME
    },

];
const LeftSideMenu: FC = () => {
    const navigation = useBudgetNavigation();
    console.log('navigation', navigation);

    return (
        <DrawerContentScrollView>
            {items.map((item) =>
                <DrawerItem
                    activeBackgroundColor={Color.backgroundBlue}
                    icon={(): JSX.Element =>
                        <FontAwesome5Icon
                            color={Color.darkNavy}
                            name={item.iconName}
                            size={24}
                        />
                    }
                    inactiveBackgroundColor={Color.white}
                    key={item.label}
                    label={(): JSX.Element => <LargeText>{item.label}</LargeText>}
                    onPress={(): void => {
                        navigation.navigate({
                            name: item.route,
                            params: {}
                        });
                        navigation.dispatch(DrawerActions.closeDrawer());
                    }}
                />
            )}
        </DrawerContentScrollView>
    );
};

export default LeftSideMenu;
