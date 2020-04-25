import React from 'react';
import {View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

import {getVariableCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {GetVariableCategories, GetVariableCategoriesVariables} from '../../autogen/GetVariableCategories';
import {getEarlyReturn} from '../services/error-and-loading-service';
import CreateVariableCategoryForm from '../components/variable-category/CreateVariableCategoryForm';
import {sortByAmount} from '../utils/sorting-utils';
import NoActiveTimePeriod from '../components/time-period/NoActiveTimePeriod';
import VariableCategoryItem from '../components/variable-category/VariableCategoryItem';
import {useBudgetNavigation, useTimePeriodId} from '../utils/hooks';
import EmptyScreen from '../components/generic/EmptyScreen';
import {Route} from '../enums/Route';
import {ListFooterComponent} from '../components/generic/Generic';
import {EXTRA_HEIGHT} from '../constants/dimensions';

import {InformationRef} from './Information';

const VariableCategories: React.FC = () => {
    const timePeriodId = useTimePeriodId();
    const queryResult = useQuery<GetVariableCategories, GetVariableCategoriesVariables>(getVariableCategoriesQuery, {
        skip: !timePeriodId,
        variables: {
            timePeriodId,
            userId: getUserId()
        }
    });
    const navigation = useBudgetNavigation();
    const onPressSubText = (): void => navigation.navigate({
        name: Route.INFORMATION,
        params: {
            ref: InformationRef.VARIABLE
        }
    });

    if (!timePeriodId) {
        return <NoActiveTimePeriod />;
    }

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {variableCategories} = queryResult.data;
    const sortedVariableCategories = variableCategories.sort(sortByAmount);

    return (
        <View style={{height: '100%'}}>
            <KeyboardAwareFlatList
                ListEmptyComponent={
                    <EmptyScreen
                        onPressSubText={onPressSubText}
                        subText={'What is a variable category?'}
                        titleText={'You haven\'t created any variable categories yet!'}
                    />
                }
                ListFooterComponent={<ListFooterComponent />}
                data={sortedVariableCategories}
                extraHeight={EXTRA_HEIGHT}
                keyExtractor={(item): string => item.variableCategoryId}
                renderItem={({item}): JSX.Element =>
                    <VariableCategoryItem
                        variableCategory={item}
                    />
                }
                showsVerticalScrollIndicator={false}
            />
            <CreateVariableCategoryForm />
        </View>
    );
};

export default VariableCategories;
