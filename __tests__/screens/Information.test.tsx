import TestRenderer, {act, ReactTestInstance, ReactTestRenderer} from 'react-test-renderer';
import React from 'react';
import {ScrollView} from 'react-native';

import Information, {InformationRef} from '../../src/screens/Information';
import {chance} from '../chance';
import {informationScrollRef} from '../../src/utils/refs';

jest.useFakeTimers();
jest.mock('../../src/utils/hooks');
jest.mock('../../src/utils/refs', () => ({
    informationScrollRef: {
        current: {
            scrollTo: jest.fn()
        }
    }
}));

describe('Information', () => {
    let expectedProps,
        TestInstance: ReactTestRenderer,
        root: ReactTestInstance;

    const render = (): void => {
        TestInstance = TestRenderer.create(
            <Information {...expectedProps} />
        );

        root = TestInstance.root;
    };

    beforeEach(() => {
        expectedProps = {
            route: {
                params: {
                    ref: undefined
                }
            }
        };

        render();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render a scroll view when a ref is **not** passed', () => {
        root.findByType(ScrollView);
    });

    describe('when a ref is passed', () => {
        it('should call scrollTo when TIME_PERIOD is passed as ref', () => {
            const expectedValue = chance.natural();

            expectedProps.route.params.ref = InformationRef.TIME_PERIOD;

            act(() => {
                TestInstance.update(<Information {...expectedProps} />);
            });

            const renderedView = root.findByProps({testID: 'TimePeriodView'});

            renderedView.props.onLayout({
                nativeEvent: {
                    layout: {
                        y: expectedValue
                    }
                }
            });
            // @ts-ignore
            setTimeout.mock.calls[2][0]();

            expect(informationScrollRef!.current!.scrollTo).toHaveBeenCalledTimes(1);
            expect(informationScrollRef!.current!.scrollTo).toHaveBeenCalledWith({
                animated: true,
                x: 0,
                y: expectedValue - 16
            });
        });

        it('should call scrollTo when FIXED is passed as ref', () => {
            const expectedValue = chance.natural();

            expectedProps.route.params.ref = InformationRef.FIXED;

            act(() => {
                TestInstance.update(<Information {...expectedProps} />);
            });

            const renderedView = root.findByProps({testID: 'FixedCategoryView'});

            renderedView.props.onLayout({
                nativeEvent: {
                    layout: {
                        y: expectedValue
                    }
                }
            });
            // @ts-ignore
            setTimeout.mock.calls[1][0]();

            expect(informationScrollRef!.current!.scrollTo).toHaveBeenCalledTimes(1);
            expect(informationScrollRef!.current!.scrollTo).toHaveBeenCalledWith({
                animated: true,
                x: 0,
                y: expectedValue - 16
            });
        });

        it('should call scrollTo when VARIABLE is passed as ref', () => {
            const expectedValue = chance.natural();

            expectedProps.route.params.ref = InformationRef.VARIABLE;

            act(() => {
                TestInstance.update(<Information {...expectedProps} />);
            });

            const renderedView = root.findByProps({testID: 'VariableCategoryView'});

            renderedView.props.onLayout({
                nativeEvent: {
                    layout: {
                        y: expectedValue
                    }
                }
            });
            // @ts-ignore
            setTimeout.mock.calls[1][0]();

            expect(informationScrollRef!.current!.scrollTo).toHaveBeenCalledTimes(1);
            expect(informationScrollRef!.current!.scrollTo).toHaveBeenCalledWith({
                animated: true,
                x: 0,
                y: expectedValue - 16
            });
        });

        it('should call scrollTo when EXPENSE is passed as ref', () => {
            const expectedValue = chance.natural();

            expectedProps.route.params.ref = InformationRef.EXPENSE;

            act(() => {
                TestInstance.update(<Information {...expectedProps} />);
            });

            const renderedView = root.findByProps({testID: 'ExpenseView'});

            renderedView.props.onLayout({
                nativeEvent: {
                    layout: {
                        y: expectedValue
                    }
                }
            });
            // @ts-ignore
            setTimeout.mock.calls[1][0]();

            expect(informationScrollRef!.current!.scrollTo).toHaveBeenCalledTimes(1);
            expect(informationScrollRef!.current!.scrollTo).toHaveBeenCalledWith({
                animated: true,
                x: 0,
                y: expectedValue - 16
            });
        });

        it('should call scrollTo when SAVING is passed as ref', () => {
            const expectedValue = chance.natural();

            expectedProps.route.params.ref = InformationRef.SAVING;

            act(() => {
                TestInstance.update(<Information {...expectedProps} />);
            });

            const renderedView = root.findByProps({testID: 'SavingView'});

            renderedView.props.onLayout({
                nativeEvent: {
                    layout: {
                        y: expectedValue
                    }
                }
            });
            // @ts-ignore
            setTimeout.mock.calls[1][0]();

            expect(informationScrollRef!.current!.scrollTo).toHaveBeenCalledTimes(1);
            expect(informationScrollRef!.current!.scrollTo).toHaveBeenCalledWith({
                animated: true,
                x: 0,
                y: expectedValue - 16
            });
        });

        it('should call scrollTo when INCOME is passed as ref', () => {
            const expectedValue = chance.natural();

            expectedProps.route.params.ref = InformationRef.INCOME;

            act(() => {
                TestInstance.update(<Information {...expectedProps} />);
            });

            const renderedView = root.findByProps({testID: 'IncomeView'});

            renderedView.props.onLayout({
                nativeEvent: {
                    layout: {
                        y: expectedValue
                    }
                }
            });
            // @ts-ignore
            setTimeout.mock.calls[1][0]();

            expect(informationScrollRef!.current!.scrollTo).toHaveBeenCalledTimes(1);
            expect(informationScrollRef!.current!.scrollTo).toHaveBeenCalledWith({
                animated: true,
                x: 0,
                y: expectedValue - 16
            });
        });

        it('should call scrollTo when DEBT is passed as ref', () => {
            const expectedValue = chance.natural();

            expectedProps.route.params.ref = InformationRef.DEBT;

            act(() => {
                TestInstance.update(<Information {...expectedProps} />);
            });

            const renderedView = root.findByProps({testID: 'DebtView'});

            renderedView.props.onLayout({
                nativeEvent: {
                    layout: {
                        y: expectedValue
                    }
                }
            });
            // @ts-ignore
            setTimeout.mock.calls[1][0]();

            expect(informationScrollRef!.current!.scrollTo).toHaveBeenCalledTimes(1);
            expect(informationScrollRef!.current!.scrollTo).toHaveBeenCalledWith({
                animated: true,
                x: 0,
                y: expectedValue - 16
            });
        });

        it('should **not** blow up if informationScrollRef.current is null', () => {
            // @ts-ignore
            informationScrollRef.current = null;

            act(() => {
                TestInstance.update(<Information {...expectedProps} />);
            });

            // @ts-ignore
            setTimeout.mock.calls[1][0]();
        });
    });
});
