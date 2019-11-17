import React, {Component} from 'react';
import {TextInput, TextStyle} from 'react-native';

import {darkFont} from '../constants/colors';

const styles = {
    default: {
        color: darkFont,
        fontSize: 18
    }
};

interface IDefaultText {
  style?: TextStyle
}

export default class DefaultText extends Component<IDefaultText> {
    render() {
        return (
            <TextInput style={[styles.default, this.props.style]}>
                {this.props.children}
            </TextInput>
        );
    }
}
