import {RouteProp} from '@react-navigation/native';
import {FC} from 'react';

import {Route} from '../enums/routes';
import {IDateTimePickerProps} from '../screens/DateTimePicker';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type StackParams = {
  [Route.HOME]: undefined
  [Route.FIXED_CATEGORIES]: undefined
  [Route.VARIABLE_CATEGORIES]: undefined
  [Route.EXPENSES]: undefined
  [Route.DATE_PICKER]: IDateTimePickerProps
  [Route.ACCOUNT]: undefined
}

export type IScreenFC<RouteName extends Route> = FC<{
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  route: RouteProp<StackParams, RouteName>
}>
