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

const styles = StyleSheet.create({
    fixedWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%'
    }
});

const VariableCategories: React.FC = () => {
    const timePeriodId = useSelector<IAppState, string>((state) => state.timePeriodId);
    const queryResult = useQuery<GetVariableCategories, GetVariableCategoriesVariables>(getVariableCategoriesQuery, {
        variables: {
            timePeriodId,
            userId: getUserId()
        }
    });

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {variableCategories} = queryResult.data;
    const sortedVariableCategories = variableCategories.sort(sortByName);

    return (
        <FlatList
            ListFooterComponent={<CreateVariableCategoryForm />}
            data={sortedVariableCategories}
            keyExtractor={(item): string => item.variableCategoryId}
            renderItem={({item}): JSX.Element =>
                <View
                    key={item.variableCategoryId}
                    style={styles.fixedWrapper}
                >
                    <View style={{width: SCREEN_WIDTH / 2}}>
                        <DefaultText>{item.name}</DefaultText>
                    </View>
                    <View style={{width: SCREEN_WIDTH / 4}}>
                        <DefaultText>{item.amount}</DefaultText>
                    </View>
                </View>
            }
        />
    );
};

export default VariableCategories;
