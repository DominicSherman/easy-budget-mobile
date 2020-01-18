import {getDefaultOptions, getLoggedInRootLayout, getLoggedOutRootLayout} from '../../src/utils/navigation-utils';
import {colors} from '../../src/constants/colors';
import {chance} from '../chance';
import * as iconService from '../../src/services/icon-service';
import {Route} from '../../src/constants/routes';

jest.mock('../../src/services/icon-service');

const tabStyle = {
    fontSize: 12,
    iconColor: colors.darkFont,
    selectedIconColor: colors.green,
    selectedTextColor: colors.green,
    textColor: colors.darkFont
};

describe('navigation utils', () => {
    const {getIcons} = iconService as jest.Mocked<typeof iconService>;

    describe('getDefaultOptions', () => {
        it('should return the default options', () => {
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
        let expectedIcons;

        beforeEach(() => {
            expectedIcons = {
                home: chance.string(),
                image: chance.string(),
                more: chance.string()
            };

            getIcons.mockReturnValue(expectedIcons);
        });

        it('should return the correct options', () => {
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
                                            icon: expectedIcons.home,
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
                                            icon: expectedIcons.image,
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
                                            icon: expectedIcons.more,
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
        it('should return the correct options', () => {
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
