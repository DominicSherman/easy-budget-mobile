import React from 'react';
import {render, RenderResult} from '@testing-library/react-native';

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
        testInstance: RenderResult;

    const renderComponent = (): void => {
        testInstance = render(<Information {...expectedProps} />);
    };

    const rerender = (): void => {
        testInstance.rerender(<Information {...expectedProps} />);
    };

    beforeEach(() => {
        expectedProps = {
            route: {
                params: {
                    ref: undefined
                }
            }
        };

        renderComponent();
    });

    afterEach(() => {

    });

    it('should render text when a ref is **not** passed', () => {
        testInstance.getByText('Time Period');
    });

    describe('when a ref is passed', () => {
        it('should call scrollTo when TIME_PERIOD is passed as ref', () => {
            const expectedValue = chance.natural();

            expectedProps.route.params.ref = InformationRef.TIME_PERIOD;

            rerender();

            const renderedView = testInstance.getByTestId('TimePeriodView');

            renderedView.props.onLayout({
                nativeEvent: {
                    layout: {
                        y: expectedValue
                    }
                }
            });
            // @ts-ignore
            setTimeout.mock.calls[1][0]();
        });

        it('should call scrollTo when FIXED is passed as ref', () => {
            const expectedValue = chance.natural();

            expectedProps.route.params.ref = InformationRef.FIXED;

            rerender();

            const renderedView = testInstance.getByTestId('FixedCategoryView');

            renderedView.props.onLayout({
                nativeEvent: {
                    layout: {
                        y: expectedValue
                    }
                }
            });
            // @ts-ignore
            setTimeout.mock.calls[1][0]();
        });

        it('should call scrollTo when VARIABLE is passed as ref', () => {
            const expectedValue = chance.natural();

            expectedProps.route.params.ref = InformationRef.VARIABLE;

            rerender();

            const renderedView = testInstance.getByTestId('VariableCategoryView');

            renderedView.props.onLayout({
                nativeEvent: {
                    layout: {
                        y: expectedValue
                    }
                }
            });
            // @ts-ignore
            setTimeout.mock.calls[1][0]();
        });

        it('should call scrollTo when EXPENSE is passed as ref', () => {
            const expectedValue = chance.natural();

            expectedProps.route.params.ref = InformationRef.EXPENSE;

            rerender();

            const renderedView = testInstance.getByTestId('ExpenseView');

            renderedView.props.onLayout({
                nativeEvent: {
                    layout: {
                        y: expectedValue
                    }
                }
            });
            // @ts-ignore
            setTimeout.mock.calls[1][0]();
        });

        it('should call scrollTo when SAVING is passed as ref', () => {
            const expectedValue = chance.natural();

            expectedProps.route.params.ref = InformationRef.SAVING;

            rerender();

            const renderedView = testInstance.getByTestId('SavingView');

            renderedView.props.onLayout({
                nativeEvent: {
                    layout: {
                        y: expectedValue
                    }
                }
            });
            // @ts-ignore
            setTimeout.mock.calls[1][0]();
        });

        it('should call scrollTo when INCOME is passed as ref', () => {
            const expectedValue = chance.natural();

            expectedProps.route.params.ref = InformationRef.INCOME;

            rerender();

            const renderedView = testInstance.getByTestId('IncomeView');

            renderedView.props.onLayout({
                nativeEvent: {
                    layout: {
                        y: expectedValue
                    }
                }
            });
            // @ts-ignore
            setTimeout.mock.calls[1][0]();
        });

        it('should call scrollTo when DEBT is passed as ref', () => {
            const expectedValue = chance.natural();

            expectedProps.route.params.ref = InformationRef.DEBT;

            rerender();

            const renderedView = testInstance.getByTestId('DebtView');

            renderedView.props.onLayout({
                nativeEvent: {
                    layout: {
                        y: expectedValue
                    }
                }
            });
            // @ts-ignore
            setTimeout.mock.calls[1][0]();
        });

        it('should **not** blow up if informationScrollRef.current is null', () => {
            // @ts-ignore
            informationScrollRef.current = null;

            rerender();

            // @ts-ignore
            setTimeout.mock.calls[1][0]();
        });
    });
});
