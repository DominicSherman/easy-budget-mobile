import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import DefaultText from '../components/DefaultText';
import {screenWrapper} from '../styles/shared-styles';
import {ICategory} from '../types/global';

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

interface IVariableExpense extends ICategory {
  spent: number;
}

const VariableExpenses: React.FC = () => {
  const [variableExpenses, setVariableExpenses] = useState<IVariableExpense[]>([
    {
      amount: 400,
      name: 'Food',
      spent: 0,
    },
  ]);

  return (
    <SafeAreaView style={screenWrapper}>
      {variableExpenses.map(variableExpense => (
        <View style={styles.fixedWrapper}>
          <DefaultText>{variableExpense.name}</DefaultText>
          <DefaultText>{variableExpense.amount}</DefaultText>
          <DefaultText>{variableExpense.spent}</DefaultText>
        </View>
      ))}
    </SafeAreaView>
  );
};

export default VariableExpenses;
