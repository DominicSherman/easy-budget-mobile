import {LayoutRoot, Options, OptionsBottomTab} from 'react-native-navigation';

import {colors} from '../constants/colors';
import {Route} from '../constants/routes';
import {getIcons} from '../services/icon-service';

const tabStyle: OptionsBottomTab = {
    fontSize: 12,
    iconColor: colors.darkFont,
    selectedIconColor: colors.green,
    selectedTextColor: colors.green,
    textColor: colors.darkFont
};

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
                                        name: Route.HOME
                                    }
                                }
                            ],
                            options: {
                                bottomTab: {
                                    ...tabStyle,
                                    icon: icons.home,
                                    text: 'HOME'
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
                                        name: Route.FIXED_CATEGORIES
                                    }
                                }
                            ],
                            options: {
                                bottomTab: {
                                    ...tabStyle,
                                    icon: icons.image,
                                    text: 'FIXED'
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
                                        name: Route.VARIABLE_CATEGORIES
                                    }
                                }
                            ],
                            options: {
                                bottomTab: {
                                    ...tabStyle,
                                    icon: icons.more,
                                    text: 'VARIABLE'
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

export const getLoggedOutRootLayout = (): LayoutRoot => ({
    root: {
        stack: {
            children: [
                {
                    component: {
                        name: Route.LOGIN
                    }
                }
            ]
        }
    }
});