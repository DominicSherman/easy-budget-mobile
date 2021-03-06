import React, {FC} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {View} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {NetworkStatus} from 'apollo-client';

import {GetIncomeItems, GetIncomeItemsVariables} from '../../autogen/GetIncomeItems';
import {getIncomeItemsQuery} from '../graphql/queries';
import {useBudgetNavigation, useTimePeriodId} from '../utils/hooks';
import {getEarlyReturn} from '../services/error-and-loading-service';
import IncomeItem from '../components/income/IncomeItem';
import {getUserId} from '../services/auth-service';
import EmptyScreen from '../components/generic/EmptyScreen';
import {Route} from '../enums/Route';
import CreateIncomeItemForm from '../components/income/CreateIncomeItemForm';
import {ListFooterComponent} from '../components/generic/Generic';
import {EXTRA_HEIGHT} from '../constants/dimensions';
import BrowsingHeader from '../components/time-period/BrowsingHeader';

import {InformationRef} from './Information';
import TimePeriods from './TimePeriods';

const Income: FC = () => {
    const timePeriodId = useTimePeriodId();
    const queryResult = useQuery<GetIncomeItems, GetIncomeItemsVariables>(getIncomeItemsQuery, {
        notifyOnNetworkStatusChange: true,
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
            ref: InformationRef.INCOME
        }
    });

    if (!timePeriodId) {
        return <TimePeriods />;
    }

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {refetch, networkStatus, data} = queryResult;
    const {incomeItems} = data;

    return (
        <View style={{height: '100%'}}>
            <KeyboardAwareFlatList
                ListEmptyComponent={
                    <EmptyScreen
                        onPressSubText={onPressSubText}
                        subText={'How does income work?'}
                        titleText={'You don\'t have any income added yet!'}
                    />
                }
                ListFooterComponent={<ListFooterComponent />}
                ListHeaderComponent={<BrowsingHeader />}
                data={incomeItems}
                extraHeight={EXTRA_HEIGHT}
                keyExtractor={(item): string => item.incomeItemId}
                onRefresh={refetch}
                refreshing={networkStatus === NetworkStatus.refetch}
                renderItem={({item}): JSX.Element =>
                    <IncomeItem incomeItem={item} />
                }
                showsVerticalScrollIndicator={false}
            />
            <CreateIncomeItemForm />
        </View>
    );
};

export default Income;
