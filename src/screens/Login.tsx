import React from 'react';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import {SafeAreaView} from 'react-native';

import {screenWrapper} from '../styles/shared-styles';
import {signIn} from '../services/auth-service';

const Login: React.FC = () => (
    <SafeAreaView style={screenWrapper}>
        <GoogleSigninButton
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            size={GoogleSigninButton.Size.Wide}
            style={{width: 192, height: 48}}
        />
    </SafeAreaView>
);

export default Login;
