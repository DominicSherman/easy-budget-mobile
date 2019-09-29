import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Switch, View} from 'react-native';
import DefaultText from '../components/DefaultText';

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
  wrapper: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
});

interface ICategory {
  amount: number;
  name: string;
}

interface IFixedExpense extends ICategory {
  paid: boolean;
}

interface IVariableExpense extends ICategory {
  spent: number;
}

interface IState {
  fixedExpenses: IFixedExpense[];
  variableExpenses: IVariableExpense[];
}

export default class App extends Component<{}, IState> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      fixedExpenses: [
        {
          name: 'Rent',
          amount: 1200,
          paid: true,
        },
      ],
      variableExpenses: [
        {
          amount: 400,
          name: 'Food',
          spent: 0,
        },
      ],
    };
  }

  render() {
    const {fixedExpenses, variableExpenses} = this.state;

    return (
      <SafeAreaView style={styles.wrapper}>
        <DefaultText style={styles.text}>{'Fixed Expenses'}</DefaultText>
        {fixedExpenses.map(fixedExpense => (
          <View style={styles.fixedWrapper}>
            <DefaultText>{fixedExpense.name}</DefaultText>
            <DefaultText>{fixedExpense.amount}</DefaultText>
            <Switch value={fixedExpense.paid} />
          </View>
        ))}
        <DefaultText style={styles.text}>{'Variable Expenses'}</DefaultText>
        {variableExpenses.map(variableExpense => (
          <View style={styles.fixedWrapper}>
            <DefaultText>{variableExpense.name}</DefaultText>
            <DefaultText>{variableExpense.amount}</DefaultText>
            <DefaultText>{variableExpense.spent}</DefaultText>
          </View>
        ))}
      </SafeAreaView>
    );
  }
}
