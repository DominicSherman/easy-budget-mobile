import React, {FC, useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
import {ApolloQueryResult} from 'apollo-client';

import {SCREEN_HEIGHT} from '../../constants/dimensions';
import {errorAlert} from '../../services/alert-service';
import {useSecondaryBackgroundColor} from '../../utils/hooks';

import {LargeText, TitleText} from './Text';
import Button from './Button';

const ErrorView: FC<{ refetch: () => Promise<ApolloQueryResult<any>> }> = ({refetch}) => {
    const [loading, setLoading] = useState(false);
    const onPress = async (): Promise<void> => {
        setLoading(true);

        try {
            await refetch();
        } catch (error) {
            errorAlert('Network Error', 'Something went wrong, please try again.');
        }

        setLoading(false);
    };

    return (
        <ScrollView
            style={{
                backgroundColor: useSecondaryBackgroundColor(),
                paddingTop: 32
            }}
        >
            <Image
                resizeMode={'contain'}
                source={require('../../../assets/error-robot-large.png')}
                style={{
                    height: SCREEN_HEIGHT * 0.4,
                    width: '100%'
                }}
            />
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 8,
                    width: '100%'
                }}
            >
                <TitleText style={{fontSize: 45}}>{'Whoops!'}</TitleText>
                <LargeText>{'It\'s not you, it\'s us.'}</LargeText>
                <Button
                    loading={loading}
                    onPress={onPress}
                    text={'Try Again'}
                    wrapperStyle={{marginTop: 48}}
                />
            </View>
        </ScrollView>
    );
};

export default ErrorView;
