import React from 'react';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import {SafeAreaView} from 'react-native';
import {screenWrapper} from '../styles/shared-styles';
import {signIn} from '../services/auth-service';

const Login: React.FC = () => {
  return (
    <SafeAreaView style={screenWrapper}>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </SafeAreaView>
  );
};

export default Login;
