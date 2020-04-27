import React from 'react';
import {View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {NetworkStatus} from 'apollo-client';

import {useBudgetNavigation, useTimePeriodId} from '../utils/hooks';
import {GetFixedCategories, GetFixedCategoriesVariables} from '../../autogen/GetFixedCategories';
import {getFixedCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {sortByAmount, sortByPaid} from '../utils/sorting-utils';
import FixedCategoryItem from '../components/fixed-category/FixedCategoryItem';
import CreateFixedCategoryForm from '../components/fixed-category/CreateFixedCategoryForm';
import {Route} from '../enums/Route';
import EmptyScreen from '../components/generic/EmptyScreen';
import {ListFooterComponent} from '../components/generic/Generic';
import {EXTRA_HEIGHT} from '../constants/dimensions';
import BrowsingHeader from '../components/time-period/BrowsingHeader';

import {InformationRef} from './Information';
import TimePeriods from './TimePeriods';

const FixedCategories: React.FC = () => {
    const timePeriodId = useTimePeriodId();
    const queryResult = useQuery<GetFixedCategories, GetFixedCategoriesVariables>(getFixedCategoriesQuery, {
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
            ref: InformationRef.FIXED
        }
    });

    if (!timePeriodId) {
        return <TimePeriods />;
    }

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {refetch, networkStatus, data} = queryResult;
    const {fixedCategories} = data;
    const sortedFixedCategories = fixedCategories.sort(sortByAmount).sort(sortByPaid);

    return (
        <View style={{height: '100%'}}>
            <KeyboardAwareFlatList
                ListEmptyComponent={
                    <EmptyScreen
                        onPressSubText={onPressSubText}
                        subText={'What is a fixed category?'}
                        titleText={'You haven\'t created any fixed categories yet!'}
                    />
                }
                ListFooterComponent={<ListFooterComponent />}
                ListHeaderComponent={<BrowsingHeader />}
                data={sortedFixedCategories}
                extraHeight={EXTRA_HEIGHT}
                keyExtractor={(item): string => item.fixedCategoryId}
                onRefresh={refetch}
                refreshing={networkStatus === NetworkStatus.refetch}
                renderItem={({item}): JSX.Element =>
                    <FixedCategoryItem fixedCategory={item} />
                }
                showsVerticalScrollIndicator={false}
            />
            <CreateFixedCategoryForm />
        </View>
    );
};

export default FixedCategories;
