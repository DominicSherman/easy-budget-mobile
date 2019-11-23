import {getDefaultOptions, getLoggedInRootLayout, getLoggedOutRootLayout} from '../../src/helpers/navigation-helpers';
import {colors} from '../../src/constants/colors';
import {chance} from '../chance';
import * as iconService from '../../src/services/icon-service';
import {routes} from '../../src/constants/routes';

jest.mock('../../src/services/icon-service');

describe('navigation helpers', () => {
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
                                                name: routes.HOME
                                            }
                                        }
                                    ],
                                    options: {
                                        bottomTab: {
                                            fontSize: 12,
                                            icon: expectedIcons.home,
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
                                            icon: expectedIcons.image,
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
                                            icon: expectedIcons.more,
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
                                    name: routes.LOGIN
                                }
                            }
                        ]
                    }
                }
            });
        });
    });
});
