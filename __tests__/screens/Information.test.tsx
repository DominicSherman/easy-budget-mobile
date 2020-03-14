import TestRenderer from 'react-test-renderer';
import React from 'react';
import {ScrollView} from 'react-native';

import Information, {InformationRef} from '../../src/screens/Information';
import {chance} from '../chance';

jest.useFakeTimers();
jest.mock('../../src/redux/hooks');

describe('Information', () => {
    let expectedProps,
        root;

    const render = (): void => {
        root = TestRenderer.create(
            <Information {...expectedProps} />
        ).root;
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

    it('should render a scroll view when a ref is **not** passed', () => {
        root.findByType(ScrollView);
    });

    describe('when a ref is passed', () => {
        let expectedScrollRef;

        beforeEach(() => {
            expectedScrollRef = {
                current: {
                    scrollTo: jest.fn()
                }
            };

            root.findByType(ScrollView);
        });

        it('should call scrollTo EXPENSE is passed as ref', () => {
            const expectedValue = chance.natural();

            expectedProps.route.params.ref = InformationRef.EXPENSE;
            render();

            const renderedView = root.findByProps({testID: 'ExpenseView'});
            const renderedScrollView = root.findByType(ScrollView);

            renderedScrollView.props.ref = expectedScrollRef;

            renderedView.props.onLayout({
                nativeEvent: {
                    layout: {
                        y: expectedValue
                    }
                }
            });
            // @ts-ignore
            setTimeout.mock.calls[0][0]();

            expect(expectedScrollRef.current.scrollTo).toHaveBeenCalledTimes(1);
        });
    });
});
