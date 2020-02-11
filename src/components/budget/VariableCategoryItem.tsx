import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Touchable from 'react-native-platform-touchable';
import {useNavigation} from '@react-navigation/native';

import {IVariableCategory} from '../../../autogen/IVariableCategory';
import CardView from '../generic/CardView';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {LargeText, RegularText, SmallText} from '../generic/Text';
import {IExpense} from '../../../autogen/IExpense';
import {FeatherNames} from '../../enums/icon-names';
import {colors} from '../../constants/colors';
import {easeInTransition} from '../../services/animation-service';
import {Route} from '../../enums/routes';

const styles = StyleSheet.create({
    bottomWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        width: '80%'
    },
    titleWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    verticalCenter: {
        alignItems: 'center',
        flexDirection: 'column'
    },
    wrapper: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginHorizontal: 8,
        width: SCREEN_WIDTH - 16
    }
});

interface IVariableCategoryItemProps {
    expenses: IExpense[]
    variableCategory: IVariableCategory
}

const calculateTotal = (expenses: IExpense[]): number => expenses.reduce((total, expense) => total + expense.amount, 0);

const VariableCategoryItem: FC<IVariableCategoryItemProps> = ({expenses, variableCategory}) => {
    const navigation = useNavigation();
    const categoryExpenses = expenses.filter((expense) => expense.variableCategoryId === variableCategory.variableCategoryId);
    const sum = calculateTotal(categoryExpenses);
    const [isVisible, setIsVisible] = useState(false);
    const toggle = (): void => {
        easeInTransition();
        setIsVisible(!isVisible);
    };
    const hitSlop = {
        bottom: 16,
        left: 15,
        right: 16,
        top: 16
    };
    const onPress = (): void => {
        navigation.navigate({
            name: Route.VARIABLE_CATEGORY,
            params: {
                variableCategoryId: variableCategory.variableCategoryId
            }
        });
    };

    return (
        <CardView
            onPress={onPress}
            shadow
            style={styles.wrapper}
        >
            <View style={styles.titleWrapper}>
                <View style={{width: '50%'}}>
                    <LargeText>{variableCategory.name}</LargeText>
                </View>
                {
                    !isVisible &&
                        <View style={styles.verticalCenter}>
                            <LargeText>{`$${variableCategory.amount - sum}`}</LargeText>
                            <SmallText>{'remaining'}</SmallText>
                        </View>
                }
                <Touchable
                    hitSlop={hitSlop}
                    onPress={toggle}
                >
                    <Feather
                        color={colors.darkerGray}
                        name={isVisible ? FeatherNames.CHEVRON_DOWN : FeatherNames.CHEVRON_UP}
                        size={32}
                    />
                </Touchable>
            </View>
            {
                isVisible &&
                    <View style={styles.bottomWrapper}>
                        <View style={styles.verticalCenter}>
                            <RegularText>{`$${variableCategory.amount}`}</RegularText>
                            <SmallText>{'budgeted'}</SmallText>
                        </View>
                        <RegularText>{'-'}</RegularText>
                        <View style={styles.verticalCenter}>
                            <RegularText>{`$${sum}`}</RegularText>
                            <SmallText>{'spent'}</SmallText>
                        </View>
                        <RegularText>{'='}</RegularText>
                        <View style={styles.verticalCenter}>
                            <LargeText>{`$${variableCategory.amount - sum}`}</LargeText>
                            <SmallText>{'remaining'}</SmallText>
                        </View>
                    </View>
            }
        </CardView>
    );
};

export default VariableCategoryItem;
