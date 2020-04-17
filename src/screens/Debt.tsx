import React, {FC} from 'react';
import {View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

import {getDebtCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {GetDebtCategories, GetDebtCategoriesVariables} from '../../autogen/GetDebtCategories';
import CreateDebtCategoryForm from '../components/debt-category/CreateDebtCategoryForm';
import DebtCategoryItem from '../components/debt-category/DebtCategoryItem';
import EmptyScreen from '../components/generic/EmptyScreen';
import {useBudgetNavigation} from '../utils/hooks';
import {Route} from '../enums/Route';
import {ListFooterComponent} from '../components/generic/Generic';
import {EXTRA_HEIGHT} from '../constants/dimensions';

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
        <View style={{height: '100%'}}>
            <KeyboardAwareFlatList
                ListEmptyComponent={
                    <EmptyScreen
                        onPressSubText={onPressSubText}
                        subText={'What is a debt category?'}
                        titleText={'You haven\'t created any debt categories yet!'}
                    />
                }
                ListFooterComponent={<ListFooterComponent />}
                data={debtCategories}
                extraHeight={EXTRA_HEIGHT}
                keyExtractor={(item): string => item.debtCategoryId}
                renderItem={({item}): JSX.Element =>
                    <DebtCategoryItem debtCategory={item} />
                }
            />
            <CreateDebtCategoryForm showCreateForm={!debtCategories.length} />
        </View>
    );
};

export default Debt;
