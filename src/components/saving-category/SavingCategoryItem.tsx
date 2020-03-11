import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {ISavingCategory} from '../../../autogen/ISavingCategory';
import CardView from '../generic/CardView';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {LargeText, SmallText} from '../generic/Text';
import {usePrimaryColor} from '../../redux/hooks';
import {easeInTransition} from '../../services/animation-service';
import EditIcon from '../generic/EditIcon';

import EditSavingCategoryForm from './EditSavingCategoryForm';

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

interface ISavingCategoryItemProps {
    savingCategory: ISavingCategory
}

const SavingCategoryItem: FC<ISavingCategoryItemProps> = ({savingCategory}) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = (): void => {
        easeInTransition();
        setExpanded(!expanded);
    };
    const totalSavings = savingCategory.savings.reduce((total, saving) => total + saving.amount, 0);

    return (
        <CardView
            disabled
            shadow
            style={styles.wrapper}
        >
            <View style={styles.topWrapper}>
                <View style={{width: '50%'}}>
                    <LargeText>{savingCategory.name}</LargeText>
                </View>
                <View style={styles.verticalCenter}>
                    <LargeText>{`$${totalSavings}`}</LargeText>
                    <SmallText>{'saved'}</SmallText>
                </View>
                <EditIcon
                    color={usePrimaryColor()}
                    isOpen={expanded}
                    onPress={toggleExpanded}
                />
            </View>
            {
                expanded &&
                    <EditSavingCategoryForm
                        onUpdate={toggleExpanded}
                        savingCategory={savingCategory}
                    />
            }
        </CardView>
    );
};

export default SavingCategoryItem;
