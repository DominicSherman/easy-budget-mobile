import React, {FC} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import {IScreenFC} from '../types/global';
import {Route} from '../enums/Route';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {getUserId} from '../services/auth-service';
import {getVariableCategoryQuery} from '../graphql/queries';
import {GetVariableCategory, GetVariableCategoryVariables} from '../../autogen/GetVariableCategory';
import ExpenseItem from '../components/expense/ExpenseItem';
import {LargeText, RegularText} from '../components/generic/Text';
import {sortByDate} from '../utils/sorting-utils';
import VariableCategoryDetails from '../components/variable-category/VariableCategoryDetails';
import CardView from '../components/generic/CardView';
import {CARD_WIDTH} from '../constants/dimensions';
import {Color} from '../constants/color';
import {IVariableCategory} from '../../autogen/IVariableCategory';
import {textWrapperUnderlined} from '../styles/shared-styles';

const styles = StyleSheet.create({
    cardWrapper: {
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: -8,
        marginHorizontal: 16,
        width: CARD_WIDTH,
        zIndex: 5
    },
    listEmptyWrapper: {
        alignItems: 'center',
        backgroundColor: Color.white,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        marginLeft: 16,
        paddingTop: 8,
        width: CARD_WIDTH,
        zIndex: -2
    },
    wrapper: {
        alignItems: 'center',
        height: '100%'
    }
});

export interface IVariableCategoryProps {
    variableCategoryId: string
}

const ListEmptyComponent: FC = () =>
    <View style={styles.listEmptyWrapper}>
        <RegularText style={{margin: 32}}>{'No expenses for this category yet! 🚀'}</RegularText>
    </View>;

const ListHeaderComponent: FC<{variableCategory: IVariableCategory}> = ({variableCategory}) =>
    <CardView
        disabled
        shadow
        style={styles.cardWrapper}
    >
        <View style={[textWrapperUnderlined, {borderBottomColor: Color.shockBlue}]}>
            <LargeText>{variableCategory.name}</LargeText>
        </View>
        <VariableCategoryDetails variableCategory={variableCategory} />
    </CardView>;

const VariableCategory: IScreenFC<Route.VARIABLE_CATEGORY> = ({route: {params: {variableCategoryId}}}) => {
    const queryResult = useQuery<GetVariableCategory, GetVariableCategoryVariables>(getVariableCategoryQuery, {
        variables: {
            userId: getUserId(),
            variableCategoryId
        }
    });

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {variableCategory} = queryResult.data;

    return (
        <SafeAreaView style={styles.wrapper}>
            <FlatList
                ListEmptyComponent={<ListEmptyComponent />}
                ListHeaderComponent={<ListHeaderComponent variableCategory={variableCategory} />}
                ListHeaderComponentStyle={{zIndex: 1}}
                data={variableCategory.expenses.sort(sortByDate)}
                keyExtractor={(item): string => item.expenseId}
                renderItem={({item, index}): JSX.Element =>
                    <ExpenseItem
                        categoryName={variableCategory.name}
                        expense={item}
                        isLastItem={index === variableCategory.expenses.length - 1}
                    />
                }
            />
        </SafeAreaView>
    );
};

export default VariableCategory;
