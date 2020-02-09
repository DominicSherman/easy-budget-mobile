import {LayoutAnimation} from 'react-native';

export const easeInTransition = (): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};
