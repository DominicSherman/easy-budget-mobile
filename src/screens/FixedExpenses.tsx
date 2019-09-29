import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Switch, View} from 'react-native';
import {ICategory} from '../types/global';
import DefaultText from '../components/DefaultText';
import {screenWrapper} from '../styles/shared-styles';

const styles = StyleSheet.create({
  fixedWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    width: '100%',
  },
  text: {
    fontSize: 30,
    fontWeight: '600',
  },
});

interface IFixedExpense extends ICategory {
  paid: boolean;
}

const FixedExpenses: React.FC = () => {
  const [fixedExpenses] = useState<IFixedExpense[]>([
    {
      name: 'Rent',
      amount: 1200,
      paid: true,
    },
  ]);
  return (
    <SafeAreaView style={screenWrapper}>
      {fixedExpenses.map(fixedExpense => (
        <View style={styles.fixedWrapper}>
          <DefaultText>{fixedExpense.name}</DefaultText>
          <DefaultText>{fixedExpense.amount}</DefaultText>
          <Switch value={fixedExpense.paid} />
        </View>
      ))}
    </SafeAreaView>
  );
};

export default FixedExpenses;
