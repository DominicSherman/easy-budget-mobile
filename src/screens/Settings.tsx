import React, {FC} from 'react';
import {Image, SafeAreaView} from 'react-native';

import Button from '../components/generic/Button';
import {signOut} from '../services/auth-service';
import {centeredColumn} from '../styles/shared-styles';
import {LargeText} from '../components/generic/Text';
import {useMode, useUserInformation} from '../utils/hooks';
import BackgroundHeader, {HEADER_HEIGHT} from '../components/generic/BackgroundHeader';
import {Mode} from '../enums/Mode';
import {CARD_MARGIN, CARD_WIDTH, SCREEN_HEIGHT} from '../constants/dimensions';
import CardView from '../components/generic/CardView';
import {Color} from '../constants/color';

const Settings: FC = () => {
    const userInformation = useUserInformation();
    const mode = useMode();
    const robotAsset = mode === Mode.DARK ?
        require('../../assets/settings-robot-dark.png') :
        require('../../assets/settings-robot-light.png');

    return (
        <SafeAreaView style={centeredColumn}>
            <BackgroundHeader />
            <Image
                resizeMode={'contain'}
                source={require('../../assets/app-logo.png')}
                style={{
                    height: HEADER_HEIGHT - 32,
                    marginBottom: 32,
                    marginTop: 16
                }}
            />
            <Image
                resizeMode={'contain'}
                source={robotAsset}
                style={{height: SCREEN_HEIGHT * 0.15}}
            />
            <CardView
                disabled
                shadow
                style={{
                    ...centeredColumn,
                    height: SCREEN_HEIGHT * 0.2,
                    justifyContent: 'space-evenly',
                    marginHorizontal: CARD_MARGIN,
                    marginTop: 0,
                    width: CARD_WIDTH
                }}
            >
                <LargeText style={{fontSize: 16}}>{userInformation.user.email}</LargeText>
                <Button
                    color={Color.lightGreen}
                    onPress={signOut}
                    text={'Log Out'}
                />
            </CardView>
        </SafeAreaView>
    );
};

export default Settings;
