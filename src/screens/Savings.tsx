import React, {FC} from 'react';
import {View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {NetworkStatus} from 'apollo-client';

import {getSavingCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {GetSavingCategories, GetSavingCategoriesVariables} from '../../autogen/GetSavingCategories';
import CreateSavingCategoryForm from '../components/saving-category/CreateSavingCategoryForm';
import SavingCategoryItem from '../components/saving-category/SavingCategoryItem';
import EmptyScreen from '../components/generic/EmptyScreen';
import {useBudgetNavigation} from '../utils/hooks';
import {Route} from '../enums/Route';
import {ListFooterComponent} from '../components/generic/Generic';
import {EXTRA_HEIGHT} from '../constants/dimensions';

import {InformationRef} from './Information';

const Savings: FC = () => {
    const queryResult = useQuery<GetSavingCategories, GetSavingCategoriesVariables>(getSavingCategoriesQuery, {
        notifyOnNetworkStatusChange: true,
        variables: {
            userId: getUserId()
        }
    });
    const navigation = useBudgetNavigation();
    const onPressSubText = (): void => navigation.navigate({
        name: Route.INFORMATION,
        params: {
            ref: InformationRef.SAVING
        }
    });

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {refetch, networkStatus, data} = queryResult;
    const {savingCategories} = data;

    return (
        <View style={{height: '100%'}}>
            <KeyboardAwareFlatList
                ListEmptyComponent={
                    <EmptyScreen
                        onPressSubText={onPressSubText}
                        subText={'What is a saving category?'}
                        titleText={'You haven\'t created any saving categories yet!'}
                    />
                }
                ListFooterComponent={<ListFooterComponent />}
                data={savingCategories}
                extraHeight={EXTRA_HEIGHT}
                keyExtractor={(item): string => item.savingCategoryId}
                onRefresh={refetch}
                refreshing={networkStatus === NetworkStatus.refetch}
                renderItem={({item}): JSX.Element =>
                    <SavingCategoryItem savingCategory={item} />
                }
                showsVerticalScrollIndicator={false}
            />
            <CreateSavingCategoryForm />
        </View>
    );
};

export default Savings;
