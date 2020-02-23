import React, {FC} from 'react';
import {SafeAreaView} from 'react-native';

import Button from '../components/generic/Button';
import {signOut} from '../services/auth-service';
import {screenWrapper} from '../styles/shared-styles';
import ModeSelector from '../components/generic/ModeSelector';

const Settings: FC = () =>
    <SafeAreaView style={[screenWrapper, {height: '60%'}]}>
        <ModeSelector />
        <Button
            onPress={signOut}
            text={'Log Out'}
        />
    </SafeAreaView>;

export default Settings;
