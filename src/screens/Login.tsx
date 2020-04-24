import React, {useState} from 'react';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import {SafeAreaView} from 'react-native';

import {screenWrapper} from '../styles/shared-styles';
import {signIn} from '../services/auth-service';
import LoadingView from '../components/generic/LoadingView';

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);

    if (loading) {
        return <LoadingView />;
    }

    return (
        <SafeAreaView style={screenWrapper}>
            <GoogleSigninButton
                color={GoogleSigninButton.Color.Dark}
                onPress={async (): Promise<void> => {
                    setLoading(true);

                    await signIn();
                }}
                size={GoogleSigninButton.Size.Wide}
                style={{
                    height: 48,
                    width: 192
                }}
            />
        </SafeAreaView>
    );
};

export default Login;
