import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import DefaultText from '../components/generic/DefaultText';
import {screenWrapper} from '../styles/shared-styles';
import {getVariableCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {SCREEN_WIDTH} from '../constants/dimensions';
import {GetVariableCategories, GetVariableCategoriesVariables} from '../../autogen/GetVariableCategories';

import CreateEditCategoryForm from './CreateEditCategoryForm';

const styles = StyleSheet.create({
    fixedWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%'
    }
});

const VariableCategories: React.FC = () => {
    const {data, loading} = useQuery<GetVariableCategories, GetVariableCategoriesVariables>(getVariableCategoriesQuery, {
        variables: {
            userId: getUserId()
        }
    });

    if (!data || loading) {
        return (
            <View style={screenWrapper}>
                <ActivityIndicator />
            </View>
        );
    }

    const {variableCategories} = data;

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 32}}
        >
            {variableCategories.map((variableCategory) => (
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

export default VariableCategories;
