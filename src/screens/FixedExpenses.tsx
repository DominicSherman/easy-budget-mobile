import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Switch, View, Dimensions} from 'react-native';

import {ICategory} from '../types/global';
import DefaultText from '../components/DefaultText';
import {
    centeredColumn,
    centeredRow,
    screenWrapper
} from '../styles/shared-styles';

const styles = StyleSheet.create({
    fixedWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%'
    },
    text: {
        fontSize: 30,
        fontWeight: '600'
    }
});

interface IFixedExpense extends ICategory {
  paid: boolean
}

const FixedExpenses: React.FC = () => {
    const [fixedExpenses] = useState<IFixedExpense[]>([
        {
            name: 'Rent',
            amount: 1200,
            paid: false
        },
        {
            name: 'Internet / Utilities',
            amount: 255,
            paid: false
        },
        {
            name: 'Insurance',
            amount: 340,
            paid: false
        }
    ]);

    return (
        <SafeAreaView style={screenWrapper}>
            <View
                style={{
                    ...centeredRow,
                    paddingHorizontal: 16,
                    width: '100%'
                }}
            >
                <View
                    style={{
                        ...centeredColumn,
                        width: Dimensions.get('window').width / 2
                    }}
                >
                    {fixedExpenses.map((fixedExpense) => (
                        <DefaultText style={{paddingVertical: 16}}>
                            {fixedExpense.name}
                        </DefaultText>
                    ))}
                </View>
                <View
                    style={{
                        ...centeredColumn,
                        width: Dimensions.get('window').width / 4
                    }}
                >
                    {fixedExpenses.map((fixedExpense) => (
                        <DefaultText style={{paddingVertical: 16}}>
                            {fixedExpense.amount}
                        </DefaultText>
                    ))}
                </View>
                <View
                    style={{
                        ...centeredColumn,
                        width: Dimensions.get('window').width / 4
                    }}
                >
                    {fixedExpenses.map((fixedExpense) =>
                        <Switch
                            style={{marginVertical: 16}}
                            value={fixedExpense.paid}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default FixedExpenses;
