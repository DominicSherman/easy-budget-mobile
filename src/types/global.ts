import {RouteProp} from '@react-navigation/native';
import {FC} from 'react';

import {Route} from '../enums/Route';
import {ScreenParams} from '../StacksOnStacksOnStacks';

export type IScreenFC<RouteName extends Route> = FC<{
  route: RouteProp<ScreenParams, RouteName>
}>
