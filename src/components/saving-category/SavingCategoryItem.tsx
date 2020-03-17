import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {ISavingCategory} from '../../../autogen/ISavingCategory';
import CardView from '../generic/CardView';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {LargeText, SmallText} from '../generic/Text';
import {easeInTransition} from '../../services/animation-service';
import EditIcon from '../generic/EditIcon';
import {usePrimaryColor} from '../../utils/hooks';
import {centeredColumn} from '../../styles/shared-styles';
import {FeatherNames} from '../../enums/IconNames';
import {Color} from '../../constants/color';

import EditSavingCategoryForm from './EditSavingCategoryForm';

const styles = StyleSheet.create({
    topWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
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

interface ISavingCategoryItemProps {
    savingCategory: ISavingCategory
}

const SavingCategoryItem: FC<ISavingCategoryItemProps> = ({savingCategory}) => {
    const [editExpanded, setEditExpanded] = useState(false);
    const [addExpanded, setAddExpanded] = useState(false);
    const [minusExpanded, setMinusExpanded] = useState(false);
    const toggleExpanded = (): void => {
        easeInTransition();
        setEditExpanded(!editExpanded);
    };

    return (
        <CardView
            disabled
            shadow
            style={styles.wrapper}
        >
            <View style={[centeredColumn, {width: '100%'}]}>
                <View style={styles.topWrapper}>
                    <View style={{width: '50%'}}>
                        <LargeText>{savingCategory.name}</LargeText>
                    </View>
                    <View style={styles.verticalCenter}>
                        <LargeText>{`$${savingCategory.amount}`}</LargeText>
                        <SmallText>{'saved'}</SmallText>
                    </View>
                    <EditIcon
                        color={usePrimaryColor()}
                        isOpen={editExpanded}
                        onPress={toggleExpanded}
                    />
                </View>
                <View style={styles.topWrapper}>
                    <View style={[styles.verticalCenter, {width: '50%'}]}>
                        <Feather
                            color={Color.red}
                            name={FeatherNames.MINUS_CIRCLE}
                            size={32}
                        />
                        <LargeText>{'remove'}</LargeText>
                    </View>
                    <View style={[styles.verticalCenter, {width: '50%'}]}>
                        <Feather
                            color={Color.green}
                            name={FeatherNames.PLUS_CIRCLE}
                            size={32}
                        />
                        <LargeText>{'add'}</LargeText>
                    </View>
                </View>
            </View>
            {

            }
            {
                editExpanded &&
                    <EditSavingCategoryForm
                        onUpdate={toggleExpanded}
                        savingCategory={savingCategory}
                    />
            }
        </CardView>
    );
};

export default SavingCategoryItem;
