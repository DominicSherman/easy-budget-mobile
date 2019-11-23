import * as Feather from 'react-native-vector-icons/Feather';
import * as EvilIcons from 'react-native-vector-icons/EvilIcons';

import {colors} from '../constants/colors';

const sets: {[key: string]: any} = {
    EvilIcons,
    Feather
};

export interface IIcons {
  home: number | undefined
  image: number | undefined
  info: number | undefined
  more: number | undefined
}

let icons: IIcons = {
    home: undefined,
    image: undefined,
    info: undefined,
    more: undefined
};

const sharedGetImageSource = (iconSet: string, name: string, size: number, color: string): any => {
    const iconLibrary = sets[iconSet];

    return iconLibrary.getImageSource(name, size, color);
};

export const loadIcons = async (): Promise<void> => {
    const [home, more, info, image] = await Promise.all([
        sharedGetImageSource('Feather', 'home', 25, colors.mediumGray),
        sharedGetImageSource('Feather', 'more-horizontal', 25, colors.mediumGray),
        sharedGetImageSource('Feather', 'info', 25, colors.mediumGray),
        sharedGetImageSource('EvilIcons', 'image', 33, colors.mediumGray)
    ]);

    icons = {
        home,
        image,
        info,
        more
    };
};

export const getIcons = (): IIcons => icons;
