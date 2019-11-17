import React, {useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import DefaultText from '../components/DefaultText';
import {screenWrapper} from '../styles/shared-styles';
import {ICategory} from '../types/global';
import {getVariableExpensesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';

const styles = StyleSheet.create({
    fixedWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%'
    },
    text: {
        fontSize: 30,
        fontWeight: '600'
    }
});

interface IVariableExpense extends ICategory {
  spent: number
}

const VariableExpenses: React.FC = () => {
    const {data, loading, error} = useQuery(getVariableExpensesQuery, {
        variables: {
            userId: getUserId()
        }
    });

    console.log('data', data);

    if (!data || loading) {
        return (
            <View style={screenWrapper}>
                <ActivityIndicator />
            </View>
        );
    }

    const {variableCategories} = data;

    return (
        <SafeAreaView style={screenWrapper}>
            {variableCategories.map((variableCategory) => (
                <View style={styles.fixedWrapper}>
                    <View style={{width: Dimensions.get('window').width / 2}}>
                        <DefaultText>{variableCategory.name}</DefaultText>
                    </View>
                    <View style={{width: Dimensions.get('window').width / 4}}>
                        <DefaultText>{variableCategory.amount}</DefaultText>
                    </View>
                </View>
            ))}
        </SafeAreaView>
    );
};

export default VariableExpenses;
