import React, {useState} from 'react';
import {SafeAreaView, Switch, View} from 'react-native';

import {IFixedExpense} from '../types/global';
import DefaultText from '../components/generic/DefaultText';
import {centeredColumn, centeredRow, screenWrapper} from '../styles/shared-styles';
import {SCREEN_WIDTH} from '../constants/dimensions';

const FixedCategories: React.FC = () => {
    const [fixedExpenses] = useState<IFixedExpense[]>([
        {
            amount: 1200,
            name: 'Rent',
            paid: false
        },
        {
            amount: 255,
            name: 'Internet / Utilities',
            paid: false
        },
        {
            amount: 340,
            name: 'Insurance',
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
                        width: SCREEN_WIDTH / 2
                    }}
                >
                    {fixedExpenses.map((fixedExpense) => (
                        <DefaultText
                            key={fixedExpense.name}
                            style={{paddingVertical: 16}}
                        >
                            {fixedExpense.name}
                        </DefaultText>
                    ))}
                </View>
                <View
                    style={{
                        ...centeredColumn,
                        width: SCREEN_WIDTH / 4
                    }}
                >
                    {fixedExpenses.map((fixedExpense) => (
                        <DefaultText
                            key={fixedExpense.name}
                            style={{paddingVertical: 16}}
                        >
                            {fixedExpense.amount}
                        </DefaultText>
                    ))}
                </View>
                <View
                    style={{
                        ...centeredColumn,
                        width: SCREEN_WIDTH / 4
                    }}
                >
                    {fixedExpenses.map((fixedExpense) =>
                        <Switch
                            key={fixedExpense.name}
                            style={{marginVertical: 16}}
                            value={fixedExpense.paid}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default FixedCategories;
