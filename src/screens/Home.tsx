import React from 'react';
import {SafeAreaView} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import DefaultText from '../components/generic/DefaultText';
import {centeredColumn, screenWrapper} from '../styles/shared-styles';
import {signOut} from '../services/auth-service';
import {black} from '../constants/colors';

const Home: React.FC = () => (
    <SafeAreaView style={screenWrapper}>
        <Touchable
            onPress={signOut}
            style={{
                ...centeredColumn,
                borderWidth: 1,
                borderColor: black,
                borderRadius: 4,
                height: '10%',
                width: '25%'
            }}
        >
            <DefaultText>{'Log Out'}</DefaultText>
        </Touchable>
    </SafeAreaView>
);

export default Home;
