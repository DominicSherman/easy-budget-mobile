import React, {FC} from 'react';
import {View} from 'react-native';
import {IScreenFC} from '../../types/global';
import {Route} from '../../enums/routes';

export interface IFixedCategoryProps {
    fixedCategoryId: string
}

const FixedCategory: IScreenFC<Route.FIXED_CATEGORY> = ({route: {params: {fixedCategoryId}}}) => {
    console.log('fixedCategoryId', fixedCategoryId);
    return (
        <View />
    );
};

export default FixedCategory;
