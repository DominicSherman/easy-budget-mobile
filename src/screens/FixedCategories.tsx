import React from 'react';
import {FlatList, Switch, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useQuery} from '@apollo/react-hooks';

import {IAppState} from '../redux/reducer';
import {GetFixedCategories, GetFixedCategoriesVariables} from '../../autogen/GetFixedCategories';
import {getFixedCategoriesQuery} from '../graphql/queries';
import {getUserId} from '../services/auth-service';
import {getEarlyReturn} from '../services/error-and-loading-service';
import {SCREEN_WIDTH} from '../constants/dimensions';
import DefaultText from '../components/generic/DefaultText';
import CreateFixedCategoryForm from '../components/CreateFixedCategoryForm';

const FixedCategories: React.FC = () => {
    const timePeriodId = useSelector<IAppState, string>((state) => state.timePeriodId);
    const queryResult = useQuery<GetFixedCategories, GetFixedCategoriesVariables>(getFixedCategoriesQuery, {
        variables: {
            timePeriodId,
            userId: getUserId()
        }
    });

    if (!queryResult.data) {
        return getEarlyReturn(queryResult);
    }

    const {fixedCategories} = queryResult.data;
    const sortedFixedCategories = fixedCategories.sort((a, b) => a.name < b.name ? -1 : 1);

    return (
        <FlatList
            ListFooterComponent={<CreateFixedCategoryForm />}
            data={sortedFixedCategories}
            renderItem={({item}): JSX.Element =>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%'
                    }}
                >
                    <View
                        style={{
                            padding: 16,
                            width: SCREEN_WIDTH / 2
                        }}
                    >
                        <DefaultText>{item.name}</DefaultText>
                    </View>
                    <View
                        style={{
                            padding: 16,
                            width: SCREEN_WIDTH / 4
                        }}
                    >
                        <DefaultText>{item.amount}</DefaultText>
                    </View>
                    <View
                        style={{
                            padding: 16,
                            width: SCREEN_WIDTH / 4
                        }}
                    >
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
