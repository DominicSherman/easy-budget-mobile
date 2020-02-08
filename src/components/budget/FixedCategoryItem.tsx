import React, {FC} from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import {useMutation} from '@apollo/react-hooks';

import {IFixedCategory} from '../../../autogen/IFixedCategory';
import DefaultText from '../generic/DefaultText';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {
    UpdateFixedCategoryMutation,
    UpdateFixedCategoryMutationVariables
} from '../../../autogen/UpdateFixedCategoryMutation';
import {updateFixedCategoryMutation} from '../../graphql/mutations';
import {getUserId} from '../../services/auth-service';

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

const FixedCategoryItem: FC<{ fixedCategory: IFixedCategory }> = ({fixedCategory}) => {
    const {name, amount, paid} = fixedCategory;
    const [updateFixedCategory] = useMutation<UpdateFixedCategoryMutation, UpdateFixedCategoryMutationVariables>(updateFixedCategoryMutation);

    return (
        <View style={styles.wrapper}>
            <View style={styles.halfWrapper}>
                <DefaultText>{name}</DefaultText>
            </View>
            <View style={styles.quarterWrapper}>
                <DefaultText>{amount}</DefaultText>
            </View>
            <View style={styles.quarterWrapper}>
                <Switch
                    onValueChange={(value): void => {
                        updateFixedCategory({
                            optimisticResponse: {
                                updateFixedCategory: {
                                    ...fixedCategory,
                                    paid: value
                                }
                            },
                            variables: {
                                fixedCategory: {
                                    fixedCategoryId: fixedCategory.fixedCategoryId,
                                    paid: value,
                                    userId: fixedCategory.userId
                                }
                            }
                        });
                    }}
                    value={paid}
                />
            </View>
        </View>
    );
};

export default FixedCategoryItem;
