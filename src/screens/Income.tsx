import React, {FC} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {FlatList, SafeAreaView} from 'react-native';

import {GetIncomeItems, GetIncomeItemsVariables} from '../../autogen/GetIncomeItems';
import {getIncomeItemsQuery} from '../graphql/queries';
import {useBudgetNavigation, useTimePeriodId} from '../utils/hooks';
import NoActiveTimePeriod from '../components/time-period/NoActiveTimePeriod';
import {getEarlyReturn} from '../services/error-and-loading-service';
import IncomeItem from '../components/income/IncomeItem';
import {getUserId} from '../services/auth-service';
import EmptyScreen from '../components/generic/EmptyScreen';
import {Route} from '../enums/Route';

const Income: FC = () => {
    const timePeriodId = useTimePeriodId();
    const queryResult = useQuery<GetIncomeItems, GetIncomeItemsVariables>(getIncomeItemsQuery, {
        skip: !timePeriodId,
        variables: {
            timePeriodId,
            userId: getUserId()
        }
    });
    const navigation = useBudgetNavigation();
    const onPressSubText = (): void => navigation.navigate({
        name: Route.INFORMATION,
        params: {}
    });

    if (!timePeriodId) {
        return <NoActiveTimePeriod />;
    }

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {incomeItems} = queryResult.data;

    return (
        <SafeAreaView style={{height: '100%'}}>
            <FlatList
                ListEmptyComponent={
                    <EmptyScreen
                        onPressSubText={onPressSubText}
                        subText={'How does income work?'}
                        titleText={'You don\t have any income added yet!'}
                    />
                }
                contentContainerStyle={{paddingBottom: 50}}
                data={incomeItems}
                keyExtractor={(item): string => item.incomeItemId}
                renderItem={({item}): JSX.Element =>
                    <IncomeItem incomeItem={item} />
                }
            />
        </SafeAreaView>
    );
};

export default Income;
