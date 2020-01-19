import {OptionsBottomTab} from 'react-native-navigation';

import {getDefaultOptions, getLoggedInRootLayout, getLoggedOutRootLayout} from '../../src/utils/navigation-utils';
import {colors} from '../../src/constants/colors';
import {chance} from '../chance';
import * as iconService from '../../src/services/icon-service';
import {Route} from '../../src/enums/routes';

jest.mock('../../src/services/icon-service');

const tabStyle: OptionsBottomTab = {
    fontSize: 12,
    iconColor: colors.darkFont,
    selectedIconColor: colors.green,
    selectedTextColor: colors.green,
    textColor: colors.darkFont
};

describe('navigation-utils', () => {
    const {getIcons} = iconService as jest.Mocked<typeof iconService>;

    describe('getDefaultOptions', () => {
        it('should return default options', () => {
            expect(getDefaultOptions()).toEqual({
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
        });
    });

    describe('getLoggedInRootLayout', () => {
        let icons;

        beforeEach(() => {
            icons = {
                home: chance.string(),
                image: chance.string(),
                more: chance.string()
            };

            getIcons.mockReturnValue(icons);
        });

        it('should return the logged in layout', () => {
            expect(getLoggedInRootLayout()).toEqual({
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
            });
        });
    });

    describe('getLoggedOutRootLayout', () => {
        it('should return the logged out layout', () => {
            expect(getLoggedOutRootLayout()).toEqual({
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
        });
    });
});
