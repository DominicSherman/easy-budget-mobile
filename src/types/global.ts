interface ICategory {
  amount: number
  name: string
}

export interface IVariableCategory extends ICategory {
  userId: string
  variableCategoryId: string
}

export interface IFixedExpense extends ICategory {
  paid: boolean
}
