import React from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useQuery} from '@apollo/react-hooks';

import {useBudgetNavigation} from '../utils/hooks';
import {IAppState} from '../redux/reducer';
import {GetFixedCategories, GetFixedCategoriesVariables} from '../../autogen/GetFixedCategories';
import {getFixedCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {sortByAmount, sortByPaid} from '../utils/sorting-utils';
import NoActiveTimePeriod from '../components/time-period/NoActiveTimePeriod';
import FixedCategoryItem from '../components/fixed-category/FixedCategoryItem';
import CreateFixedCategoryForm from '../components/fixed-category/CreateFixedCategoryForm';
import {Route} from '../enums/Route';
import EmptyScreen from '../components/generic/EmptyScreen';
import {flatListWrapper, safeAreaViewWrapper} from '../styles/shared-styles';

import {InformationRef} from './Information';
import {ListFooterComponent} from '../components/generic/Generic';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

const FixedCategories: React.FC = () => {
    const timePeriodId = useSelector<IAppState, string>((state) => state.timePeriodId);
    const queryResult = useQuery<GetFixedCategories, GetFixedCategoriesVariables>(getFixedCategoriesQuery, {
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
        return <NoActiveTimePeriod/>;
    }

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {fixedCategories} = queryResult.data;
    const showCreateForm = !fixedCategories.length;
    const sortedFixedCategories = fixedCategories.sort(sortByAmount).sort(sortByPaid);

    return (
        <View style={{height: '100%'}}>
            <FlatList
                ListEmptyComponent={
                    <EmptyScreen
                        onPressSubText={onPressSubText}
                        subText={'What is a fixed category?'}
                        titleText={'You haven\'t created any fixed categories yet!'}
                    />
                }
                ListFooterComponent={<ListFooterComponent/>}
                data={sortedFixedCategories}
                keyExtractor={(item): string => item.fixedCategoryId}
                renderItem={({item}): JSX.Element =>
                    <FixedCategoryItem fixedCategory={item}/>
                }
            />
            <CreateFixedCategoryForm showCreateForm={showCreateForm}/>
        </View>
    );
};

export default FixedCategories;
