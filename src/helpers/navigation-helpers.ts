import {LayoutRoot, Options} from 'react-native-navigation';

import {colors} from '../constants/colors';
import {routes} from '../constants/routes';
import {getIcons} from '../services/icon-service';

export const getDefaultOptions = (): Options => ({
    layout: {
        orientation: ['portrait']
    },
    topBar: {
        animate: false,
        background: {
            color: colors.white
        },
        drawBehind: false,
        title: {
            color: colors.darkFont
        },
        visible: true
    }
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
                                        name: routes.HOME
                                    }
                                }
                            ],
                            options: {
                                bottomTab: {
                                    fontSize: 12,
                                    icon: icons.home,
                                    iconColor: colors.darkFont,
                                    text: 'HOME',
                                    textColor: colors.darkFont
                                },
                                topBar: {
                                    title: {
                                        text: 'Easy Budget'
                                    }
                                }
                            }
                        }
                    },
                    {
                        stack: {
                            children: [
                                {
                                    component: {
                                        name: routes.FIXED_EXPENSES
                                    }
                                }
                            ],
                            options: {
                                bottomTab: {
                                    fontSize: 12,
                                    icon: icons.image,
                                    iconColor: colors.darkFont,
                                    text: 'FIXED',
                                    textColor: colors.darkFont
                                },
                                topBar: {
                                    title: {
                                        text: 'Easy Budget'
                                    }
                                }
                            }
                        }
                    },
                    {
                        stack: {
                            children: [
                                {
                                    component: {
                                        name: routes.VARIABLE_EXPENSES
                                    }
                                }
                            ],
                            options: {
                                bottomTab: {
                                    fontSize: 12,
                                    icon: icons.more,
                                    iconColor: colors.darkFont,
                                    text: 'VARIABLE',
                                    textColor: colors.darkFont
                                },
                                topBar: {
                                    title: {
                                        text: 'Easy Budget'
                                    }
                                }
                            }
                        }
                    }
                ],
                options: {
                    bottomTabs: {
                        animate: false,
                        drawBehind: true
                    }
                }
            }
        }
    };
};

export const getLoggedOutRootLayout = () => ({
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: routes.LOGIN
                    }
                }
            ]
        }
    }
});
