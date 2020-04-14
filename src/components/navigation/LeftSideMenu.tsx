import React, {FC} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/routers';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {Route} from '../../enums/Route';
import {useBudgetNavigation, useDarkBlueColor} from '../../utils/hooks';
import {Color} from '../../constants/color';
import {FontWeight, RegularMontserratText} from '../generic/Text';
import {View} from 'react-native';

const items = [
    {
        iconName: 'home',
        label: 'Home',
        route: Route.HOME
    },
    {
        iconName: 'money-bill-wave',
        label: 'Variable Categories',
        route: Route.VARIABLE_CATEGORIES
    },
    {
        iconName: 'calendar-week',
        label: 'Fixed Categories',
        route: Route.FIXED_CATEGORIES
    },
    {
        iconName: 'file-invoice-dollar',
        label: 'Expenses',
        route: Route.EXPENSES
    },
    {
        iconName: 'hand-holding-usd',
        label: 'Income',
        route: Route.INCOME
    },
    {
        iconName: 'wallet',
        label: 'Savings',
        route: Route.SAVINGS
    },
    {
        iconName: 'dollar-sign',
        label: 'Debt',
        route: Route.DEBT
    },
    {
        iconName: 'cog',
        label: 'Settings',
        route: Route.SETTINGS
    }
];
const LeftSideMenu: FC = () => {
    const navigation = useBudgetNavigation();
    const color = useDarkBlueColor();

    return (
        <DrawerContentScrollView>
            {items.map((item) =>
                <DrawerItem
                    activeBackgroundColor={Color.backgroundBlue}
                    icon={(): JSX.Element =>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                width: 28
                            }}
                        >
                            <FontAwesome5Icon
                                color={color}
                                name={item.iconName}
                                size={22}
                            />
                        </View>
                    }
                    inactiveBackgroundColor={Color.white}
                    key={item.label}
                    label={(): JSX.Element =>
                        <RegularMontserratText
                            color={color}
                            fontWeight={FontWeight.EXTRA_BOLD}
                        >
                            {item.label}
                        </RegularMontserratText>
                    }
                    onPress={(): void => {
                        navigation.navigate({
                            name: item.route,
                            params: {}
                        });
                        navigation.dispatch(DrawerActions.closeDrawer());
                    }}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}
                />
            )}
        </DrawerContentScrollView>
    );
};

export default LeftSideMenu;
