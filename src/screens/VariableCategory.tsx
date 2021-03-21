import {useQuery} from '@apollo/react-hooks';
import {NetworkStatus} from 'apollo-client';
import React, {FC} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View
} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';

import {
    GetVariableCategory,
    GetVariableCategoryVariables
} from '../../autogen/GetVariableCategory';
import {IVariableCategory} from '../../autogen/IVariableCategory';
import CreateExpenseForm from '../components/expense/CreateExpenseForm';
import ExpenseItem from '../components/expense/ExpenseItem';
import CardView from '../components/generic/CardView';
import {
    LargeText,
    RegularText
} from '../components/generic/Text';
import VariableCategoryDetails
    from '../components/variable-category/VariableCategoryDetails';
import {Color} from '../constants/color';
import {CARD_WIDTH} from '../constants/dimensions';
import {Route} from '../enums/Route';
import {getVariableCategoryQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {textWrapperUnderlined} from '../styles/shared-styles';
import {IScreenFC} from '../types/global';
import {useSecondaryBackgroundColor} from '../utils/hooks';
import {sortByDate} from '../utils/sorting-utils';

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

const ListHeaderComponent: FC<{variableCategory: IVariableCategory}> = ({variableCategory}) =>
    <View>
        <View style={{marginBottom: 16}}>
            <CreateExpenseForm variableCategoryId={variableCategory.variableCategoryId} />
        </View>
        <CardView
            disabled
            shadow
            style={styles.cardWrapper}
        >
            <View style={[textWrapperUnderlined, {borderBottomColor: Color.shockBlue}]}>
                <LargeText>{variableCategory.name}</LargeText>
            </View>
            <VariableCategoryDetails variableCategory={variableCategory} />
        </CardView>
    </View>;

const VariableCategory: IScreenFC<Route.VARIABLE_CATEGORY> = ({route: {params: {variableCategoryId}}}) => {
    const queryResult = useQuery<GetVariableCategory, GetVariableCategoryVariables>(getVariableCategoryQuery, {
        notifyOnNetworkStatusChange: true,
        variables: {
            userId: getUserId(),
            variableCategoryId
        }
    });
    const backgroundColor = useSecondaryBackgroundColor();

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {refetch, networkStatus, data} = queryResult;
    const {variableCategory} = data;

    return (
        <SafeAreaView style={styles.wrapper}>
            <KeyboardAwareFlatList
                ListEmptyComponent={
                    <View style={[styles.listEmptyWrapper, {backgroundColor}]}>
                        <RegularText style={{margin: 32}}>{'No expenses for this category yet! 🚀'}</RegularText>
                    </View>
                }
                ListHeaderComponent={<ListHeaderComponent variableCategory={variableCategory} />}
                ListHeaderComponentStyle={{zIndex: 1}}
                data={variableCategory.expenses.sort(sortByDate)}
                keyExtractor={(item): string => item.expenseId}
                onRefresh={refetch}
                refreshing={networkStatus === NetworkStatus.refetch}
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
