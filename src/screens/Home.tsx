import React from 'react';
import {SafeAreaView} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import DefaultText from '../components/generic/DefaultText';
import {centeredColumn, screenWrapper} from '../styles/shared-styles';
import {signOut} from '../services/auth-service';
import {colors} from '../constants/colors';

const Home: React.FC = () => (
    <SafeAreaView style={screenWrapper}>
        <Touchable
            onPress={signOut}
            style={{
                ...centeredColumn,
                borderColor: colors.black,
                borderRadius: 4,
                borderWidth: 1,
                height: '10%',
                width: '25%'
            }}
        >
            <DefaultText>{'Log Out'}</DefaultText>
        </Touchable>
    </SafeAreaView>
);

export default Home;
