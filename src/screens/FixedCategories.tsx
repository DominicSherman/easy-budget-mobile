import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useQuery} from '@apollo/react-hooks';

import {IAppState} from '../redux/reducer';
import {GetFixedCategories, GetFixedCategoriesVariables} from '../../autogen/GetFixedCategories';
import {getFixedCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {sortByName} from '../utils/sorting-utils';
import NoActiveTimePeriod from '../components/budget/NoActiveTimePeriod';
import FixedCategoryItem from '../components/budget/FixedCategoryItem';
import {RegularText} from '../components/generic/Text';
import {SCREEN_WIDTH} from '../constants/dimensions';
import CreateFixedCategoryForm from '../components/budget/CreateFixedCategoryForm';

const styles = StyleSheet.create({
    fixedWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        width: '100%'
    },
    halfItemWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH / 2
    },
    itemWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH / 4
    }
});

const FixedCategories: React.FC = () => {
    const timePeriodId = useSelector<IAppState, string>((state) => state.timePeriodId);
    const queryResult = useQuery<GetFixedCategories, GetFixedCategoriesVariables>(getFixedCategoriesQuery, {
        skip: !timePeriodId,
        variables: {
            timePeriodId,
            userId: getUserId()
        }
    });

    if (!timePeriodId) {
        return <NoActiveTimePeriod />;
    }

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {fixedCategories} = queryResult.data;
    const sortedFixedCategories = fixedCategories.sort(sortByName);

    return (
        <FlatList
            ListHeaderComponent={
                <View>
                    <CreateFixedCategoryForm />
                    <View style={[styles.fixedWrapper, {borderBottomWidth: 1}]}>
                        <View style={styles.halfItemWrapper}>
                            <RegularText style={{fontWeight: '600'}}>{'Name'}</RegularText>
                        </View>
                        <View style={styles.itemWrapper}>
                            <RegularText style={{fontWeight: '600'}}>{'Amount'}</RegularText>
                        </View>
                        <View style={styles.itemWrapper}>
                            <RegularText style={{fontWeight: '600'}}>{'Paid'}</RegularText>
                        </View>
                    </View>
                </View>
            }
            data={sortedFixedCategories}
            keyExtractor={(item): string => item.fixedCategoryId}
            renderItem={({item}): JSX.Element =>
                <FixedCategoryItem fixedCategory={item} />
            }
        />
    );
};

export default FixedCategories;
