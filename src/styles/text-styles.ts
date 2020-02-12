import {StyleSheet} from 'react-native';

import {colors} from '../constants/colors';

export const textStyles = StyleSheet.create({
    large: {
        color: colors.darkBlue,
        fontSize: 22,
        fontWeight: '600'
    },
    medium: {
        color: colors.darkBlue,
        fontSize: 20,
        fontWeight: '400'
    },
    regular: {
        color: colors.darkBlue,
        fontSize: 18,
        fontWeight: '400'
    },
    small: {
        color: colors.lightFont,
        fontSize: 14,
        fontWeight: '400'
    },
    title: {
        color: colors.darkBlue,
        fontSize: 26,
        fontWeight: '700'
    }
});
