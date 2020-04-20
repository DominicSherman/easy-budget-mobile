import React, {FC} from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/routers';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {View} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import {Route} from '../../enums/Route';
import {useBudgetNavigation, useDarkBlueColor, useSecondaryBackgroundColor, useTheme} from '../../utils/hooks';
import {Color} from '../../constants/color';
import {FontWeight, RegularMontserratText} from '../generic/Text';
import {FontAwesomeNames} from '../../enums/IconNames';
import {Theme} from '../../services/theme-service';

interface IItem {
    iconName: string
    label: string
    route: Route
}

const items: IItem[] = [
    {
        iconName: FontAwesomeNames.HOME,
        label: 'Home',
        route: Route.HOME
    },
    {
        iconName: FontAwesomeNames.MONEY_BILL,
        label: 'Variable',
        route: Route.VARIABLE_CATEGORIES
    },
    {
        iconName: FontAwesomeNames.CALENDAR,
        label: 'Fixed',
        route: Route.FIXED_CATEGORIES
    },
    {
        iconName: FontAwesomeNames.FILE,
        label: 'Expenses',
        route: Route.EXPENSES
    },
    {
        iconName: FontAwesomeNames.HAND_DOLLARS,
        label: 'Income',
        route: Route.INCOME
    },
    {
        iconName: FontAwesomeNames.WALLET,
        label: 'Savings',
        route: Route.SAVINGS
    },
    {
        iconName: FontAwesomeNames.DOLLAR_SIGN,
        label: 'Debt',
        route: Route.DEBT
    },
    {
        iconName: FontAwesomeNames.DOLLAR_SIGN,
        label: 'Time Periods',
        route: Route.TIME_PERIODS
    },
    {
        iconName: FontAwesomeNames.SETTINGS,
        label: 'Settings',
        route: Route.SETTINGS
    }
];

const Item: FC<{ isActive: boolean, item: IItem }> = ({isActive, item}) => {
    const navigation = useBudgetNavigation();
    const color = useDarkBlueColor();
    const onPress = (): void => {
        navigation.navigate({
            name: item.route,
            params: {}
        });
        navigation.dispatch(DrawerActions.closeDrawer());
    };
    const secondaryBackground = useSecondaryBackgroundColor();
    const {backgroundColor, textColor} = useTheme(Theme.BLUE);

    return (
        <Touchable
            onPress={onPress}
            style={{
                backgroundColor: isActive ? backgroundColor : secondaryBackground,
                borderBottomRightRadius: 25,
                borderColor: Color.white,
                borderTopRightRadius: 25,
                borderWidth: 0,
                flexDirection: 'row',
                marginVertical: 8,
                padding: 16,
                paddingVertical: 8,
                width: '90%'
            }}
        >
            <>
                <View
                    style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginRight: 16,
                        width: 28
                    }}
                >
                    {
                        item.iconName === FontAwesomeNames.DOLLAR_SIGN &&
                            <FontAwesome5Icon
                                color={color}
                                name={'minus'}
                                size={14}
                                style={{marginRight: 2}}
                            />
                    }
                    <FontAwesome5Icon
                        color={color}
                        name={item.iconName}
                        size={22}
                    />
                </View>
                <RegularMontserratText
                    color={isActive ? textColor : color}
                    fontWeight={FontWeight.EXTRA_BOLD}
                >
                    {item.label}
                </RegularMontserratText>
            </>
        </Touchable>
    );
};

const LeftSideMenu: FC<{ state: { index: number } }> = ({state}) => (
    <DrawerContentScrollView style={{backgroundColor: useSecondaryBackgroundColor()}}>
        {items.map((item, index) =>
            <Item
                isActive={index === state.index}
                item={item}
                key={item.label}
            />
        )}
    </DrawerContentScrollView>
);

export default LeftSideMenu;
