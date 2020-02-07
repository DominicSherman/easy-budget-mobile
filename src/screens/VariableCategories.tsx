import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {useSelector} from 'react-redux';

import DefaultText from '../components/generic/DefaultText';
import {getVariableCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {SCREEN_WIDTH} from '../constants/dimensions';
import {GetVariableCategories, GetVariableCategoriesVariables} from '../../autogen/GetVariableCategories';
import {IAppState} from '../redux/reducer';
import {getEarlyReturn} from '../services/error-and-loading-service';
import CreateVariableCategoryForm from '../components/budget/CreateVariableCategoryForm';
import {sortByName} from '../utils/sorting-utils';
import NoActiveTimePeriod from '../components/budget/NoActiveTimePeriod';
import {IExpense} from '../../autogen/IExpense';

const styles = StyleSheet.create({
    fixedWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        width: '100%'
    },
    itemWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH / 4
    }
});

const VariableCategories: React.FC = () => {
    const timePeriodId = useSelector<IAppState, string>((state) => state.timePeriodId);
    const queryResult = useQuery<GetVariableCategories, GetVariableCategoriesVariables>(getVariableCategoriesQuery, {
        skip: !timePeriodId,
        variables: {
            timePeriodId,
            userId: getUserId()
        }
    });

    console.log('queryResult', queryResult);

    if (!timePeriodId) {
        return <NoActiveTimePeriod />;
    }

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {variableCategories} = queryResult.data;
    const sortedVariableCategories = variableCategories.sort(sortByName);
    const calculateTotal = (expenses: IExpense[]): number => expenses.reduce((total, expense) => total + expense.amount, 0);

    return (
        <FlatList
            ListFooterComponent={<CreateVariableCategoryForm />}
            ListHeaderComponent={
                <View style={[styles.fixedWrapper, {borderBottomWidth: 1}]}>
                    <View style={styles.itemWrapper}>
                        <DefaultText style={{fontWeight: '600'}}>{'Name'}</DefaultText>
                    </View>
                    <View style={styles.itemWrapper}>
                        <DefaultText style={{fontWeight: '600'}}>{'Amount'}</DefaultText>
                    </View>
                    <View style={styles.itemWrapper}>
                        <DefaultText style={{fontWeight: '600'}}>{'Remaining'}</DefaultText>
                    </View>
                    <View style={styles.itemWrapper}>
                        <DefaultText style={{fontWeight: '600'}}>{'Spent'}</DefaultText>
                    </View>
                </View>
            }
            data={sortedVariableCategories}
            keyExtractor={(item): string => item.variableCategoryId}
            renderItem={({item}): JSX.Element =>
                <View
                    key={item.variableCategoryId}
                    style={styles.fixedWrapper}
                >
                    <View style={styles.itemWrapper}>
                        <DefaultText>{item.name}</DefaultText>
                    </View>
                    <View style={styles.itemWrapper}>
                        <DefaultText>{item.amount}</DefaultText>
                    </View>
                    <View style={styles.itemWrapper}>
                        <DefaultText>{item.amount - calculateTotal(item.expenses)}</DefaultText>
                    </View>
                    <View style={styles.itemWrapper}>
                        <DefaultText>{calculateTotal(item.expenses)}</DefaultText>
                    </View>
                </View>
            }
        />
    );
};

export default VariableCategories;
