import React, {FC} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import {getSavingCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {GetSavingCategories, GetSavingCategoriesVariables} from '../../autogen/GetSavingCategories';
import CreateSavingCategoryForm from '../components/saving-category/CreateSavingCategoryForm';
import SavingCategoryItem from '../components/saving-category/SavingCategoryItem';
import EmptyScreen from '../components/generic/EmptyScreen';
import {useBudgetNavigation} from '../utils/hooks';
import {Route} from '../enums/Route';

import {InformationRef} from './Information';

const Savings: FC = () => {
    const queryResult = useQuery<GetSavingCategories, GetSavingCategoriesVariables>(getSavingCategoriesQuery, {
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

    const {savingCategories} = queryResult.data;

    return (
        <SafeAreaView style={{height: '100%'}}>
            <FlatList
                ListEmptyComponent={
                    <EmptyScreen
                        onPressSubText={onPressSubText}
                        subText={'What is a saving category?'}
                        titleText={'You haven\'t created any saving categories yet!'}
                    />
                }
                data={savingCategories}
                keyExtractor={(item): string => item.savingCategoryId}
                renderItem={({item}): JSX.Element =>
                    <SavingCategoryItem savingCategory={item} />
                }
            />
            <CreateSavingCategoryForm showCreateForm={!savingCategories.length} />
        </SafeAreaView>
    );
};

export default Savings;
