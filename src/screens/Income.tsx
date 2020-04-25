import React, {FC} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {View} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

import {GetIncomeItems, GetIncomeItemsVariables} from '../../autogen/GetIncomeItems';
import {getIncomeItemsQuery} from '../graphql/queries';
import {useBudgetNavigation, useTimePeriodId} from '../utils/hooks';
import NoActiveTimePeriod from '../components/time-period/NoActiveTimePeriod';
import {getEarlyReturn} from '../services/error-and-loading-service';
import IncomeItem from '../components/income/IncomeItem';
import {getUserId} from '../services/auth-service';
import EmptyScreen from '../components/generic/EmptyScreen';
import {Route} from '../enums/Route';
import CreateIncomeItemForm from '../components/income/CreateIncomeItemForm';
import {ListFooterComponent} from '../components/generic/Generic';
import {EXTRA_HEIGHT} from '../constants/dimensions';

import {InformationRef} from './Information';

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
        params: {
            ref: InformationRef.INCOME
        }
    });

    if (!timePeriodId) {
        return <NoActiveTimePeriod />;
    }

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {incomeItems} = queryResult.data;

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
                data={incomeItems}
                extraHeight={EXTRA_HEIGHT}
                keyExtractor={(item): string => item.incomeItemId}
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
