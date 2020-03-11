import React, {FC} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import {getSavingCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {GetSavingCategories, GetSavingCategoriesVariables} from '../../autogen/GetSavingCategories';
import CreateSavingCategoryForm from '../components/saving-category/CreateSavingCategoryForm';
import SavingCategoryItem from '../components/saving-category/SavingCategoryItem';

const Savings: FC = () => {
    const queryResult = useQuery<GetSavingCategories, GetSavingCategoriesVariables>(getSavingCategoriesQuery, {
        variables: {
            userId: getUserId()
        }
    });

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {savingCategories} = queryResult.data;

    return (
        <SafeAreaView style={{height: '100%'}}>
            <FlatList
                data={savingCategories}
                keyExtractor={(item): string => item.savingCategoryId}
                renderItem={({item}): JSX.Element =>
                    <SavingCategoryItem savingCategory={item} />
                }
            />
            <CreateSavingCategoryForm />
        </SafeAreaView>
    );
};

export default Savings;
