import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import DefaultText from '../components/generic/DefaultText';
import {getVariableCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {SCREEN_WIDTH} from '../constants/dimensions';
import {GetVariableCategories, GetVariableCategoriesVariables} from '../../autogen/GetVariableCategories';
import {withRedux} from '../redux/with-redux';
import {IAppState} from '../redux/reducer';
import {getEarlyReturn} from '../services/error-and-loading-service';

import CreateEditCategoryForm from './CreateEditCategoryForm';

const styles = StyleSheet.create({
    fixedWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%'
    }
});

const VariableCategories: React.FC<IAppState> = ({timePeriodId}) => {
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
        <ScrollView
            contentContainerStyle={{paddingBottom: 32}}
        >
            {sortedVariableCategories.map((variableCategory) => (
                <View
                    key={variableCategory.variableCategoryId}
                    style={styles.fixedWrapper}
                >
                    <View style={{width: SCREEN_WIDTH / 2}}>
                        <DefaultText>{variableCategory.name}</DefaultText>
                    </View>
                    <View style={{width: SCREEN_WIDTH / 4}}>
                        <DefaultText>{variableCategory.amount}</DefaultText>
                    </View>
                </View>
            ))}
            <CreateEditCategoryForm />
        </ScrollView>
    );
};

export default withRedux(VariableCategories);
