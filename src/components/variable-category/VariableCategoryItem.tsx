import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {IVariableCategory} from '../../../autogen/IVariableCategory';
import CardView from '../generic/CardView';
import {CARD_WIDTH} from '../../constants/dimensions';
import {FontWeight, LargeText, RegularMontserratText, TinyText} from '../generic/Text';
import {Route} from '../../enums/Route';
import {useBudgetNavigation} from '../../utils/hooks';
import {calculateTotal} from '../../utils/utils';
import {easeInTransition} from '../../services/animation-service';
import {Color} from '../../constants/color';
import {textWrapperRounded} from '../../styles/shared-styles';
import MoreIcon from '../generic/MoreIcon';

import EditVariableCategoryForm from './EditVariableCategoryForm';

const styles = StyleSheet.create({
    textWrapper: {
        ...textWrapperRounded
    },
    topWrapper: {
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
        marginHorizontal: 16,
        width: CARD_WIDTH
    }
});

interface IVariableCategoryItemProps {
    variableCategory: IVariableCategory
}

const VariableCategoryItem: FC<IVariableCategoryItemProps> = ({variableCategory}) => {
    const navigation = useBudgetNavigation();
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = (): void => {
        easeInTransition();
        setExpanded(!expanded);
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
            onPress={toggleExpanded}
            shadow
            style={styles.wrapper}
        >
            <View style={styles.topWrapper}>
                <View style={{width: '50%'}}>
                    <View style={styles.textWrapper}>
                        <RegularMontserratText
                            color={Color.selectedBlue}
                            fontWeight={FontWeight.BOLD}
                        >
                            {variableCategory.name}
                        </RegularMontserratText>
                    </View>
                </View>
                <View style={styles.verticalCenter}>
                    <LargeText>{`$${variableCategory.amount - calculateTotal(variableCategory.expenses)}`}</LargeText>
                    <TinyText>{'remaining'}</TinyText>
                </View>
                <MoreIcon
                    onPress={onPress}
                />
            </View>
            {
                expanded &&
                    <EditVariableCategoryForm
                        toggleExpanded={toggleExpanded}
                        variableCategory={variableCategory}
                    />
            }
        </CardView>
    );
};

export default VariableCategoryItem;
