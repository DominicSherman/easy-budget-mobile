import React from 'react';
import {FlatList, StyleSheet, Switch, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useQuery} from '@apollo/react-hooks';

import {IAppState} from '../redux/reducer';
import {GetFixedCategories, GetFixedCategoriesVariables} from '../../autogen/GetFixedCategories';
import {getFixedCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {SCREEN_WIDTH} from '../constants/dimensions';
import DefaultText from '../components/generic/DefaultText';
import CreateFixedCategoryForm from '../components/budget/CreateFixedCategoryForm';
import {sortByName} from '../utils/sorting-utils';
import NoActiveTimePeriod from '../components/budget/NoActiveTimePeriod';

const styles = StyleSheet.create({
    halfWrapper: {
        padding: 16,
        width: SCREEN_WIDTH / 2
    },
    quarterWrapper: {
        padding: 16,
        width: SCREEN_WIDTH / 4
    },
    wrapper: {
        flexDirection: 'row',
        width: '100%'
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
            ListFooterComponent={<CreateFixedCategoryForm />}
            data={sortedFixedCategories}
            keyExtractor={(item): string => item.fixedCategoryId}
            renderItem={({item}): JSX.Element =>
                <View style={styles.wrapper}>
                    <View style={styles.halfWrapper}>
                        <DefaultText>{item.name}</DefaultText>
                    </View>
                    <View style={styles.quarterWrapper}>
                        <DefaultText>{item.amount}</DefaultText>
                    </View>
                    <View style={styles.quarterWrapper}>
                        <Switch
                            value={item.paid}
                        />
                    </View>
                </View>
            }
        />
    );
};

export default FixedCategories;
