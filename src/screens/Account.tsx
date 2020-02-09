import React, {FC} from 'react';
import {SafeAreaView} from 'react-native';

import Button from '../components/generic/Button';
import {signOut} from '../services/auth-service';
import {screenWrapper} from '../styles/shared-styles';

const Account: FC = () =>
    <SafeAreaView style={screenWrapper}>
        <Button
            onPress={signOut}
            text={'Log Out'}
        />
    </SafeAreaView>;

export default Account;
