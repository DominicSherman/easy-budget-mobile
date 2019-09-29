import {black, darkFont, green, white} from '../constants/style-variables';
import {FIXED_EXPENSES, HOME, VARIABLE_EXPENSES} from '../constants/routes';

import {getIcons, IIcons} from './icons-factory';

export const getDefaultOptions = () => ({
  layout: {
    orientation: 'portrait',
  },
  topBar: {
    animate: false,
    background: {
      color: white,
    },
    buttonColor: black,
    drawBehind: false,
    title: {
      color: darkFont,
    },
    visible: true,
  },
});

const getMainRoot = (icons: IIcons) => ({
  root: {
    bottomTabs: {
      children: [
        {
          stack: {
            children: [
              {
                component: {
                  name: HOME,
                },
              },
            ],
            options: {
              bottomTab: {
                icon: icons.home,
                title: 'Home',
              },
              topBar: {
                title: {
                  text: 'Easy Budget',
                },
              },
            },
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: FIXED_EXPENSES,
                },
              },
            ],
            options: {
              bottomTab: {
                icon: icons.image,
                title: 'Fixed Expenses',
              },
              topBar: {
                title: {
                  text: 'Easy Budget',
                },
              },
            },
          },
        },
        {
          stack: {
            children: [
              {
                component: {
                  name: VARIABLE_EXPENSES,
                },
              },
            ],
            options: {
              bottomTab: {
                icon: icons.more,
                title: 'Variable Expenses',
              },
              topBar: {
                title: {
                  text: 'Easy Budget',
                },
              },
            },
          },
        },
      ],
      options: {
        bottomTabs: {
          animate: false,
          drawBehind: true,
          selectedTabColor: green,
        },
      },
    },
  },
});

export const getRoot = () => {
  const icons = getIcons();

  return getMainRoot(icons);
};
