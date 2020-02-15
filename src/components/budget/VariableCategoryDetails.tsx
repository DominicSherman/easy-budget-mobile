import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {LargeText, RegularText, SmallText} from '../generic/Text';
import {IVariableCategory} from '../../../autogen/IVariableCategory';
import {calculateTotal} from '../../utils/utils';

const styles = StyleSheet.create({
    bottomWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        width: '80%'
    },
    verticalCenter: {
        alignItems: 'center',
        flexDirection: 'column'
    }
});

const VariableCategoryDetails: FC<{variableCategory: IVariableCategory}> = ({variableCategory}) => {
    const sum = calculateTotal(variableCategory.expenses);

    return (
        <View style={styles.bottomWrapper}>
            <View style={styles.verticalCenter}>
                <RegularText>{`$${variableCategory.amount}`}</RegularText>
                <SmallText>{'budgeted'}</SmallText>
            </View>
            <RegularText>{'-'}</RegularText>
            <View style={styles.verticalCenter}>
                <RegularText>{`$${sum}`}</RegularText>
                <SmallText>{'spent'}</SmallText>
            </View>
            <RegularText>{'='}</RegularText>
            <View style={styles.verticalCenter}>
                <LargeText>{`$${variableCategory.amount - sum}`}</LargeText>
                <SmallText>{'remaining'}</SmallText>
            </View>
        </View>
    );
};

export default VariableCategoryDetails;
