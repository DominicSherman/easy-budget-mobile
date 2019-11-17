import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Home from '../src/screens/Home';

test('renders correctly', () => {
    renderer.create(<Home />);
});
