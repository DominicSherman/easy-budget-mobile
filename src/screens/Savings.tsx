import React, {FC} from 'react';
import {View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

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
                renderItem={({item}): JSX.Element =>
                    <SavingCategoryItem savingCategory={item} />
                }
            />
            <CreateSavingCategoryForm />
        </View>
    );
};

export default Savings;
