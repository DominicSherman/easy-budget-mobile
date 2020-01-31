import {FC} from 'react';

export type IScreenFC<T> = FC<{
  route: {
    params: T
  }
}>
