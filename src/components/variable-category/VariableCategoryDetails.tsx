import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {LargeText, RegularText, TinyText} from '../generic/Text';
import {IVariableCategory} from '../../../autogen/IVariableCategory';
import {calculateTotal} from '../../utils/utils';

const styles = StyleSheet.create({
    bottomWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
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
                <TinyText>{'budgeted'}</TinyText>
            </View>
            <RegularText>{'-'}</RegularText>
            <View style={styles.verticalCenter}>
                <RegularText>{`$${sum.toFixed(2)}`}</RegularText>
                <TinyText>{'spent'}</TinyText>
            </View>
            <RegularText>{'='}</RegularText>
            <View style={styles.verticalCenter}>
                <LargeText>{`$${(variableCategory.amount - sum).toFixed(2)}`}</LargeText>
                <TinyText>{'remaining'}</TinyText>
            </View>
        </View>
    );
};

export default VariableCategoryDetails;
