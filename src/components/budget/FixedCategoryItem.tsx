import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import Feather from 'react-native-vector-icons/Feather';
import Touchable from 'react-native-platform-touchable';
import {useNavigation} from '@react-navigation/native';

import {IFixedCategory} from '../../../autogen/IFixedCategory';
import {LargeText, SmallText, TitleText} from '../generic/Text';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {
    UpdateFixedCategoryMutation,
    UpdateFixedCategoryMutationVariables
} from '../../../autogen/UpdateFixedCategoryMutation';
import {updateFixedCategoryMutation} from '../../graphql/mutations';
import CardView from '../generic/CardView';
import {FeatherNames} from '../../enums/icon-names';
import {Route} from '../../enums/routes';
import {usePrimaryColor} from '../../redux/hooks';
import {colors} from '../../constants/colors';
import {easeInTransition} from '../../services/animation-service';

const styles = StyleSheet.create({
    rightWrapper: {
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    verticalCenter: {
        alignItems: 'center',
        flexDirection: 'column'
    },
    wrapper: {
        borderWidth: 1,
        marginHorizontal: 8,
        width: SCREEN_WIDTH - 16
    }
});

const FixedCategoryItem: FC<{ fixedCategory: IFixedCategory }> = ({fixedCategory}) => {
    const {name, amount, paid, note, userId, fixedCategoryId} = fixedCategory;
    const navigation = useNavigation();
    const [updateFixedCategory] = useMutation<UpdateFixedCategoryMutation, UpdateFixedCategoryMutationVariables>(updateFixedCategoryMutation);
    const primaryColor = usePrimaryColor();
    const color = paid ? colors.orange : primaryColor;
    const iconName = paid ? FeatherNames.CHECK_SQUARE : FeatherNames.SQUARE;
    const togglePaid = (): void => {
        easeInTransition();
        updateFixedCategory({
            optimisticResponse: {
                updateFixedCategory: {
                    ...fixedCategory,
                    paid: !paid
                }
            },
            variables: {
                fixedCategory: {
                    fixedCategoryId,
                    paid: !paid,
                    userId
                }
            }
        });
    };
    const onPress = (): void => {
        navigation.navigate({
            name: Route.FIXED_CATEGORY,
            params: {
                fixedCategoryId
            }
        });
    };

    return (
        <CardView
            onPress={onPress}
            shadow
            style={[styles.wrapper, {borderColor: color}]}
        >
            <View style={{width: '60%'}}>
                <TitleText style={[{color}, paid && {textDecorationLine: 'line-through'}]}>{name}</TitleText>
                {
                    note ?
                        <SmallText style={{marginTop: 8}}>{note}</SmallText>
                        :
                        null
                }
            </View>
            <View style={styles.rightWrapper}>
                <View style={[styles.verticalCenter, {marginRight: 32}]}>
                    <LargeText style={{color}}>{`$${amount}`}</LargeText>
                    <SmallText>{'amount'}</SmallText>
                </View>
                <View style={styles.verticalCenter}>
                    <Touchable onPress={togglePaid}>
                        <View>
                            <Feather
                                color={color}
                                name={iconName}
                                size={28}
                            />
                            <SmallText>{'paid'}</SmallText>
                        </View>
                    </Touchable>
                </View>
            </View>
        </CardView>
    );
};

export default FixedCategoryItem;
