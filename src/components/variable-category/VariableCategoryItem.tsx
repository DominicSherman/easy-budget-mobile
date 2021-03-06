import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import HapticFeedback from 'react-native-haptic-feedback';

import {IVariableCategory} from '../../../autogen/IVariableCategory';
import CardView from '../generic/CardView';
import {CARD_MARGIN, CARD_WIDTH} from '../../constants/dimensions';
import {LargeText, TinyText} from '../generic/Text';
import {Route} from '../../enums/Route';
import {useBudgetNavigation} from '../../utils/hooks';
import {calculateTotal} from '../../utils/utils';
import {easeInTransition} from '../../services/animation-service';
import MoreIcon from '../generic/MoreIcon';
import {Theme} from '../../services/theme-service';
import ColoredText from '../generic/ColoredText';

import EditVariableCategoryForm from './EditVariableCategoryForm';

const styles = StyleSheet.create({
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
        marginHorizontal: CARD_MARGIN,
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
            onPress={onPress}
            shadow
            style={styles.wrapper}
        >
            <View style={styles.topWrapper}>
                <View style={{width: '50%'}}>
                    <ColoredText
                        text={variableCategory.name}
                        theme={Theme.BLUE}
                    />
                </View>
                <View style={styles.verticalCenter}>
                    <LargeText>{`$${(variableCategory.amount - calculateTotal(variableCategory.expenses)).toFixed()}`}</LargeText>
                    <TinyText>{'remaining'}</TinyText>
                </View>
                <MoreIcon
                    onPress={(): void => {
                        HapticFeedback.trigger('impactLight');
                        toggleExpanded();
                    }}
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
