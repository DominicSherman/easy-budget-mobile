import {RouteProp} from '@react-navigation/native';
import {FC} from 'react';

import {Route} from '../enums/Route';
import {IDateTimePickerProps} from '../screens/DateTimePicker';
import {IVariableCategoryProps} from '../screens/VariableCategory';
import {IExpenseProps} from '../screens/Expense';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type StackParams = {
  [Route.HOME]: undefined
  [Route.FIXED_CATEGORIES]: undefined
  [Route.VARIABLE_CATEGORIES]: undefined
  [Route.EXPENSES]: undefined
  [Route.EXPENSE]: IExpenseProps
  [Route.DATE_PICKER]: IDateTimePickerProps
  [Route.SETTINGS]: undefined
  [Route.VARIABLE_CATEGORY]: IVariableCategoryProps
  [Route.LOADING]: undefined
  [Route.ERROR]: undefined
  [Route.LOGIN]: undefined
  [Route.VARIABLE_CATEGORY_INFO]: undefined
}

export type IScreenFC<RouteName extends Route> = FC<{
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  route: RouteProp<StackParams, RouteName>
}>
