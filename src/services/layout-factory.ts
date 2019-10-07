import {darkFont, white} from '../constants/style-variables';
import {
  FIXED_EXPENSES,
  HOME,
  LOGIN,
  VARIABLE_EXPENSES,
} from '../constants/routes';
import {getIcons} from './icons-factory';
import {LayoutRoot, Options} from 'react-native-navigation';

export const getDefaultOptions = (): Options => ({
  layout: {
    orientation: ['portrait'],
  },
  topBar: {
    animate: false,
    background: {
      color: white,
    },
    drawBehind: false,
    title: {
      color: darkFont,
    },
    visible: true,
  },
});

export const getLoggedInRootLayout = (): LayoutRoot => {
  const icons = getIcons();

  return {
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
                  text: 'HOME',
                  iconColor: darkFont,
                  textColor: darkFont,
                  fontSize: 12,
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
                  text: 'FIXED',
                  iconColor: darkFont,
                  textColor: darkFont,
                  fontSize: 12,
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
                  text: 'VARIABLE',
                  iconColor: darkFont,
                  textColor: darkFont,
                  fontSize: 12,
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
          },
        },
      },
    },
  };
};

export const getLoggedOutRootLayout = () => ({
  root: {
    stack: {
      children: [
        {
          component: {
            name: LOGIN,
          },
        },
      ],
    },
  },
});
