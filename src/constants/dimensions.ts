import {Dimensions} from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const CARD_MARGIN = 16;
export const CARD_WIDTH = SCREEN_WIDTH - (CARD_MARGIN * 2);
export const EXTRA_HEIGHT = 125;
