import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
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

import EditFixedCategoryForm from './EditFixedCategoryForm';

const styles = StyleSheet.create({
    rightWrapper: {
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    topWrapper: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    verticalCenter: {
        alignItems: 'center',
        flexDirection: 'column'
    },
    wrapper: {
        borderWidth: 1,
        flexDirection: 'column',
        marginHorizontal: 8,
        width: SCREEN_WIDTH - 16
    }
});

const hitSlop = {
    bottom: 24,
    left: 24,
    right: 24,
    top: 24
};

const FixedCategoryItem: FC<{ fixedCategory: IFixedCategory }> = ({fixedCategory}) => {
    const [expanded, setExpanded] = useState(false);
    const {name, amount, paid, note, userId, fixedCategoryId} = fixedCategory;
    const [updateFixedCategory] = useMutation<UpdateFixedCategoryMutation, UpdateFixedCategoryMutationVariables>(updateFixedCategoryMutation);
    const primaryColor = usePrimaryColor();
    const color = paid ? colors.orange : primaryColor;
    const iconName = paid ? FeatherNames.CHECK_SQUARE : FeatherNames.SQUARE;
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
                <View style={{width: '45%'}}>
                    <LargeText style={[{color}, paid && {textDecorationLine: 'line-through'}]}>{name}</LargeText>
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
                    <Touchable onPress={togglePaid}>
                        <View style={[styles.verticalCenter, {marginRight: 40}]}>
                            <Feather
                                color={color}
                                name={iconName}
                                size={20}
                            />
                            <SmallText>{'paid'}</SmallText>
                        </View>
                    </Touchable>
                    <Touchable
                        hitSlop={hitSlop}
                        onPress={toggleExpanded}
                    >
                        <View style={[styles.verticalCenter, {width: 36}]}>
                            <Feather
                                color={color}
                                name={expanded ? FeatherNames.X : FeatherNames.EDIT}
                                size={20}
                            />
                            <SmallText>{expanded ? 'close' : 'edit'}</SmallText>
                        </View>
                    </Touchable>
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
