import React, {FC} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import {getDebtCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {GetDebtCategories, GetDebtCategoriesVariables} from '../../autogen/GetDebtCategories';
import CreateDebtCategoryForm from '../components/debt-category/CreateDebtCategoryForm';
import DebtCategoryItem from '../components/debt-category/DebtCategoryItem';
import EmptyScreen from '../components/generic/EmptyScreen';
import {useBudgetNavigation} from '../utils/hooks';
import {Route} from '../enums/Route';

import {InformationRef} from './Information';

const Debt: FC = () => {
    const queryResult = useQuery<GetDebtCategories, GetDebtCategoriesVariables>(getDebtCategoriesQuery, {
        variables: {
            userId: getUserId()
        }
    });
    const navigation = useBudgetNavigation();
    const onPressSubText = (): void => navigation.navigate({
        name: Route.INFORMATION,
        params: {
            ref: InformationRef.DEBT
        }
    });

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {debtCategories} = queryResult.data;

    return (
        <SafeAreaView style={{height: '100%'}}>
            <FlatList
                ListEmptyComponent={
                    <EmptyScreen
                        onPressSubText={onPressSubText}
                        subText={'What is a debt category?'}
                        titleText={'You haven\'t created any debt categories yet!'}
                    />
                }
                data={debtCategories}
                keyExtractor={(item): string => item.debtCategoryId}
                renderItem={({item}): JSX.Element =>
                    <DebtCategoryItem debtCategory={item} />
                }
            />
            <CreateDebtCategoryForm showCreateForm={!debtCategories.length} />
        </SafeAreaView>
    );
};

export default Debt;
