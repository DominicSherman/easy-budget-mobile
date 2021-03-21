import {useMutation} from '@apollo/react-hooks';
import React, {
    FC,
    useState
} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import HapticFeedback from 'react-native-haptic-feedback';
import Feather from 'react-native-vector-icons/Feather';

import {IFixedCategory} from '../../../autogen/IFixedCategory';
import {
    UpdateFixedCategoryMutation,
    UpdateFixedCategoryMutationVariables
} from '../../../autogen/UpdateFixedCategoryMutation';
import {Color} from '../../constants/color';
import {
    CARD_MARGIN,
    CARD_WIDTH
} from '../../constants/dimensions';
import {FeatherNames} from '../../enums/IconNames';
import {updateFixedCategoryMutation} from '../../graphql/mutations';
import {easeInTransition} from '../../services/animation-service';
import {Theme} from '../../services/theme-service';
import {centeredColumn} from '../../styles/shared-styles';
import {useDarkBlueColor} from '../../utils/hooks';
import CardView from '../generic/CardView';
import ColoredText from '../generic/ColoredText';
import MoreIcon from '../generic/MoreIcon';
import {
    FontWeight,
    LargeText,
    TinyText
} from '../generic/Text';

import EditFixedCategoryForm from './EditFixedCategoryForm';

const styles = StyleSheet.create({
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
        marginHorizontal: CARD_MARGIN,
        width: CARD_WIDTH
    }
});

const FixedCategoryItem: FC<{ fixedCategory: IFixedCategory }> = ({fixedCategory}) => {
    const [expanded, setExpanded] = useState(false);
    const {name, amount, paid, note, userId, fixedCategoryId} = fixedCategory;
    const [updateFixedCategory] = useMutation<UpdateFixedCategoryMutation, UpdateFixedCategoryMutationVariables>(updateFixedCategoryMutation);
    const primaryColor = useDarkBlueColor();
    const textColor = paid ? Color.selectedGreen : primaryColor;
    const iconName = paid ? FeatherNames.CHECK_SQUARE : FeatherNames.SQUARE;
    const theme = paid ? Theme.GREEN : Theme.RED;
    const iconColor = paid ? Color.selectedGreen : Color.selectedRed;
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
            onPress={togglePaid}
            shadow
            style={styles.wrapper}
        >
            <View style={styles.topWrapper}>
                <View style={styles.titleWrapper}>
                    <ColoredText
                        style={{marginBottom: 2}}
                        text={name}
                        theme={theme}
                    />
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
                        <LargeText color={textColor}>{`$${amount}`}</LargeText>
                        <TinyText>{'amount'}</TinyText>
                    </View>
                    <View style={[centeredColumn, {marginRight: 8}]}>
                        <Feather
                            color={iconColor}
                            name={iconName}
                            size={20}
                        />
                        <TinyText>{'paid'}</TinyText>
                    </View>
                    <View
                        style={[centeredColumn, {
                            marginBottom: 2,
                            marginLeft: 8
                        }]}
                    >
                        <MoreIcon
                            onPress={(): void => {
                                HapticFeedback.trigger('impactLight');
                                toggleExpanded();
                            }}
                        />
                    </View>
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
