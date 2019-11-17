import {mediumGray} from '../constants/colors';

import {sharedGetImageSource} from './icon-loader';

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

export const loadIcons = async () => {
    const [home, more, info, image] = await Promise.all([
        sharedGetImageSource('Feather', 'home', 25, mediumGray),
        sharedGetImageSource('Feather', 'more-horizontal', 25, mediumGray),
        sharedGetImageSource('Feather', 'info', 25, mediumGray),
        sharedGetImageSource('EvilIcons', 'image', 33, mediumGray)
    ]);

    icons = {
        home,
        image,
        info,
        more
    };
};

export const getIcons = (): IIcons => icons;
