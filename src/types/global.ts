interface ICategory {
  amount: number
  name: string
}

export interface IFixedExpense extends ICategory {
  paid: boolean
}
