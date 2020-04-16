import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import Feather from 'react-native-vector-icons/Feather';
import Touchable from 'react-native-platform-touchable';

import {IFixedCategory} from '../../../autogen/IFixedCategory';
import {FontWeight, LargeText, RegularMontserratText, TinyText} from '../generic/Text';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {
    UpdateFixedCategoryMutation,
    UpdateFixedCategoryMutationVariables
} from '../../../autogen/UpdateFixedCategoryMutation';
import {updateFixedCategoryMutation} from '../../graphql/mutations';
import CardView from '../generic/CardView';
import {FeatherNames} from '../../enums/IconNames';
import {useDarkBlueColor} from '../../utils/hooks';
import {Color} from '../../constants/color';
import {easeInTransition} from '../../services/animation-service';
import {centeredColumn, textWrapperRounded} from '../../styles/shared-styles';

import EditFixedCategoryForm from './EditFixedCategoryForm';

const styles = StyleSheet.create({
    categoryNameWrapper: {
        ...textWrapperRounded,
        marginBottom: 2
    },
    rightWrapper: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    titleWrapper: {
        alignItems: 'center',
        maxWidth: '50%'
    },
    topWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
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

const FixedCategoryItem: FC<{ fixedCategory: IFixedCategory }> = ({fixedCategory}) => {
    const [expanded, setExpanded] = useState(false);
    const {name, amount, paid, note, userId, fixedCategoryId} = fixedCategory;
    const [updateFixedCategory] = useMutation<UpdateFixedCategoryMutation, UpdateFixedCategoryMutationVariables>(updateFixedCategoryMutation);
    const primaryColor = useDarkBlueColor();
    const color = paid ? Color.sunflower : primaryColor;
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
            onPress={toggleExpanded}
            shadow
            style={styles.wrapper}
        >
            <View style={styles.topWrapper}>
                <View style={styles.titleWrapper}>
                    <View style={styles.categoryNameWrapper}>
                        <RegularMontserratText
                            color={Color.selectedBlue}
                            fontWeight={FontWeight.BOLD}
                        >
                            {name}
                        </RegularMontserratText>
                    </View>
                    {
                        note ?
                            <TinyText fontWeight={FontWeight.BOLD}>
                                {note}
                            </TinyText>
                            :
                            null
                    }
                </View>
                <View style={styles.rightWrapper}>
                    <View style={[centeredColumn, {marginRight: 32}]}>
                        <LargeText style={{color}}>{`$${amount}`}</LargeText>
                        <TinyText>{'amount'}</TinyText>
                    </View>
                    <Touchable onPress={togglePaid}>
                        <View style={[centeredColumn, {marginRight: 8}]}>
                            <Feather
                                color={color}
                                name={iconName}
                                size={20}
                            />
                            <TinyText>{'paid'}</TinyText>
                        </View>
                    </Touchable>
                </View>
            </View>
            {
                expanded &&
                    <EditFixedCategoryForm
                        fixedCategory={fixedCategory}
                        toggleExpanded={toggleExpanded}
                    />
            }
        </CardView>
    );
};

export default FixedCategoryItem;
