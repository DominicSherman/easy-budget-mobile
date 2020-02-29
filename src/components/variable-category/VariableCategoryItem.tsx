import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {IVariableCategory} from '../../../autogen/IVariableCategory';
import CardView from '../generic/CardView';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {LargeText, SmallText} from '../generic/Text';
import {Route} from '../../enums/Route';
import {usePrimaryColor} from '../../redux/hooks';
import {calculateTotal} from '../../utils/utils';
import {easeInTransition} from '../../services/animation-service';
import EditIcon from '../generic/EditIcon';

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
        marginHorizontal: 8,
        width: SCREEN_WIDTH - 16
    }
});

interface IVariableCategoryItemProps {
    variableCategory: IVariableCategory
}

const VariableCategoryItem: FC<IVariableCategoryItemProps> = ({variableCategory}) => {
    const navigation = useNavigation();
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
                    <LargeText>{variableCategory.name}</LargeText>
                </View>
                <View style={styles.verticalCenter}>
                    <LargeText>{`$${variableCategory.amount - calculateTotal(variableCategory.expenses)}`}</LargeText>
                    <SmallText>{'remaining'}</SmallText>
                </View>
                <EditIcon
                    color={usePrimaryColor()}
                    isOpen={expanded}
                    onPress={toggleExpanded}
                />
            </View>
            {
                expanded &&
                    <EditVariableCategoryForm
                        onUpdate={toggleExpanded}
                        variableCategory={variableCategory}
                    />
            }
        </CardView>
    );
};

export default VariableCategoryItem;
