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
import CreateVariableCategoryForm from '../components/CreateVariableCategoryForm';

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
    const sortedVariableCategories = variableCategories.sort((a, b) => a.name < b.name ? -1 : 1);

    return (
        <FlatList
            ListFooterComponent={<CreateVariableCategoryForm />}
            data={sortedVariableCategories}
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
