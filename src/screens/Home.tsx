import React from 'react';
import {SafeAreaView} from 'react-native';
import DefaultText from '../components/DefaultText';
import {screenWrapper} from '../styles/shared-styles';

const Home: React.FC = () => {
  return (
    <SafeAreaView style={screenWrapper}>
      <DefaultText>{'Home'}</DefaultText>
    </SafeAreaView>
  );
};

export default Home;
