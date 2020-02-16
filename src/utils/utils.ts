import {IExpense} from '../../autogen/IExpense';

export const calculateTotal = (expenses: IExpense[]): number => expenses.reduce((total, expense) => total + expense.amount, 0);
