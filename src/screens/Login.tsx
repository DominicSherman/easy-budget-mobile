import React, {useState} from 'react';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import {SafeAreaView} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import {screenWrapper} from '../styles/shared-styles';
import {signIn} from '../services/auth-service';
import LoadingView from '../components/generic/LoadingView';

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);

    if (loading) {
        return <LoadingView />;
    }

    return (
        <SafeAreaView
            style={screenWrapper}
        >
            <Touchable
                onPress={async (): Promise<void> => {
                    setLoading(true);

                    try {
                        await signIn();
                    } catch (error) {
                        setLoading(false);
                    }
                }}
                testID={'signInButton'}
            >
                <GoogleSigninButton
                    color={GoogleSigninButton.Color.Dark}
                    size={GoogleSigninButton.Size.Wide}
                    style={{
                        height: 48,
                        width: 192
                    }}
                />
            </Touchable>
        </SafeAreaView>
    );
};

export default Login;
