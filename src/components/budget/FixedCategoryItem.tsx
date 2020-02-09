import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import Feather from 'react-native-vector-icons/Feather';
import Touchable from 'react-native-platform-touchable';

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
import {colors} from '../../constants/colors';

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
        marginHorizontal: 8,
        width: SCREEN_WIDTH - 16
    }
});

const FixedCategoryItem: FC<{ fixedCategory: IFixedCategory }> = ({fixedCategory}) => {
    const {name, amount, paid, note} = fixedCategory;
    const [updateFixedCategory] = useMutation<UpdateFixedCategoryMutation, UpdateFixedCategoryMutationVariables>(updateFixedCategoryMutation);
    const iconName = paid ? FeatherNames.CHECK_SQUARE : FeatherNames.SQUARE;
    const borderAndIconColor = paid ? colors.green : colors.lightGray;
    const textColor = paid ? colors.green : colors.darkerGray;
    const onPress = (): void => {
        updateFixedCategory({
            optimisticResponse: {
                updateFixedCategory: {
                    ...fixedCategory,
                    paid: !paid
                }
            },
            variables: {
                fixedCategory: {
                    fixedCategoryId: fixedCategory.fixedCategoryId,
                    paid: !paid,
                    userId: fixedCategory.userId
                }
            }
        });
    };

    return (
        <CardView
            shadow
            style={{
                ...styles.wrapper,
                borderColor: borderAndIconColor
            }}
        >
            <View style={{width: '60%'}}>
                <TitleText style={{color: textColor}}>{name}</TitleText>
                {
                    note ?
                        <SmallText style={{marginTop: 8}}>{note}</SmallText>
                        :
                        null
                }
            </View>
            <View style={styles.rightWrapper}>
                <View style={[styles.verticalCenter, {marginRight: 32}]}>
                    <LargeText>{`$${amount}`}</LargeText>
                    <SmallText>{'amount'}</SmallText>
                </View>
                <View style={styles.verticalCenter}>
                    <Touchable onPress={onPress}>
                        <View>
                            <Feather
                                color={borderAndIconColor}
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
