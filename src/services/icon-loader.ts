import * as Feather from 'react-native-vector-icons/Feather';
import * as EvilIcons from 'react-native-vector-icons/EvilIcons';

const sets: {[key: string]: any} = {
  ['EvilIcons']: EvilIcons,
  ['Feather']: Feather,
};

export const sharedGetImageSource = (
  iconSet: string,
  ...args: (string | number)[]
) => {
  const iconLibrary = sets[iconSet];

  return iconLibrary.getImageSource(...args);
};
