import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Touchable from 'react-native-platform-touchable';
import {useNavigation} from '@react-navigation/native';

import {IVariableCategory} from '../../../autogen/IVariableCategory';
import CardView from '../generic/CardView';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {LargeText, SmallText} from '../generic/Text';
import {FeatherNames} from '../../enums/IconNames';
import {Route} from '../../enums/Route';
import {usePrimaryColor} from '../../redux/hooks';
import {calculateTotal} from '../../utils/utils';

import VariableCategoryDetails from './VariableCategoryDetails';

const styles = StyleSheet.create({
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
    variableCategory: IVariableCategory
}

const VariableCategoryItem: FC<IVariableCategoryItemProps> = ({variableCategory}) => {
    const navigation = useNavigation();
    const [isVisible, setIsVisible] = useState(false);
    const toggle = (): void => {
        setIsVisible(!isVisible);
    };
    const hitSlop = {
        bottom: 24,
        left: 24,
        right: 24,
        top: 24
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
                            <LargeText>{`$${variableCategory.amount - calculateTotal(variableCategory.expenses)}`}</LargeText>
                            <SmallText>{'remaining'}</SmallText>
                        </View>
                }
                <Touchable
                    hitSlop={hitSlop}
                    onPress={toggle}
                >
                    <Feather
                        color={usePrimaryColor()}
                        name={isVisible ? FeatherNames.CHEVRON_DOWN : FeatherNames.CHEVRON_UP}
                        size={32}
                    />
                </Touchable>
            </View>
            {
                isVisible &&
                    <VariableCategoryDetails variableCategory={variableCategory} />
            }
        </CardView>
    );
};

export default VariableCategoryItem;
