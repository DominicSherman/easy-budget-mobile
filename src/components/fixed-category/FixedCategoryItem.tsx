import React, {FC, useState} from 'react';
import {StyleProp, StyleSheet, TextStyle, View} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import Feather from 'react-native-vector-icons/Feather';
import Touchable from 'react-native-platform-touchable';

import {IFixedCategory} from '../../../autogen/IFixedCategory';
import {LargeText, SmallText} from '../generic/Text';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {
    UpdateFixedCategoryMutation,
    UpdateFixedCategoryMutationVariables
} from '../../../autogen/UpdateFixedCategoryMutation';
import {updateFixedCategoryMutation} from '../../graphql/mutations';
import CardView from '../generic/CardView';
import {FeatherNames} from '../../enums/IconNames';
import {usePrimaryColor} from '../../redux/hooks';
import {colors} from '../../constants/colors';
import {easeInTransition} from '../../services/animation-service';
import {centeredColumn} from '../../styles/shared-styles';
import EditIcon from '../generic/EditIcon';

import EditFixedCategoryForm from './EditFixedCategoryForm';

const styles = StyleSheet.create({
    amountWrapper: {
        justifyContent: 'center',
        marginRight: 24,
        width: '45%'
    },
    paidWrapper: {
        marginRight: 24
    },
    rightWrapper: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        width: '55%'
    },
    titleWrapper: {
        width: '45%'
    },
    topWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    wrapper: {
        alignItems: 'flex-start',
        borderWidth: 1,
        flexDirection: 'column',
        marginHorizontal: 8,
        width: SCREEN_WIDTH - 16
    }
});

const FixedCategoryItem: FC<{fixedCategory: IFixedCategory}> = ({fixedCategory}) => {
    const [expanded, setExpanded] = useState(false);
    const {name, amount, paid, note, userId, fixedCategoryId} = fixedCategory;
    const [updateFixedCategory] = useMutation<UpdateFixedCategoryMutation, UpdateFixedCategoryMutationVariables>(updateFixedCategoryMutation);
    const primaryColor = usePrimaryColor();
    const color = paid ? colors.orange : primaryColor;
    const iconName = paid ? FeatherNames.CHECK_SQUARE : FeatherNames.SQUARE;
    const titleStyle: StyleProp<TextStyle> = [
        {color},
        paid && {textDecorationLine: 'line-through'}
    ];
    const toggleExpanded = (): void => {
        easeInTransition();
        setExpanded(!expanded);
    };
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

    return (
        <CardView
            disabled
            shadow
            style={styles.wrapper}
        >
            <View style={styles.topWrapper}>
                <View style={styles.titleWrapper}>
                    <LargeText style={titleStyle}>{name}</LargeText>
                    {
                        note ?
                            <SmallText style={{marginTop: 8}}>{note}</SmallText>
                            :
                            null
                    }
                </View>
                <View style={styles.rightWrapper}>
                    <View style={[centeredColumn, styles.amountWrapper]}>
                        <LargeText style={{color}}>{`$${amount}`}</LargeText>
                        <SmallText>{'amount'}</SmallText>
                    </View>
                    <Touchable onPress={togglePaid}>
                        <View style={[centeredColumn, styles.paidWrapper]}>
                            <Feather
                                color={color}
                                name={iconName}
                                size={20}
                            />
                            <SmallText>{'paid'}</SmallText>
                        </View>
                    </Touchable>
                    <EditIcon
                        color={color}
                        isOpen={expanded}
                        onPress={toggleExpanded}
                    />
                </View>
            </View>
            {
                expanded &&
                    <EditFixedCategoryForm
                        fixedCategory={fixedCategory}
                        onUpdate={toggleExpanded}
                    />
            }
        </CardView>
    );
};

export default FixedCategoryItem;
