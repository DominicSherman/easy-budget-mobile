import React, {FC} from 'react';
import {SafeAreaView} from 'react-native';

import Button from '../components/generic/Button';
import {signOut} from '../services/auth-service';
import {screenWrapper} from '../styles/shared-styles';
import ModeSelector from '../components/generic/ModeSelector';
import {LargeText} from '../components/generic/Text';
import {useUserInformation} from '../utils/hooks';

const Settings: FC = () => {
    const userInformation = useUserInformation();

    return (
        <SafeAreaView style={[screenWrapper, {height: '60%'}]}>
            <LargeText>{userInformation.user.email}</LargeText>
            <ModeSelector />
            <Button
                onPress={signOut}
                text={'Log Out'}
            />
        </SafeAreaView>
    );
};

export default Settings;
