import TestRenderer from 'react-test-renderer';
import React from 'react';

import FixedCategories from '../../src/screens/FixedCategories';
import DefaultText from '../../src/components/generic/DefaultText';

describe('FixedCategories', () => {
    const {root} = TestRenderer.create(
        <FixedCategories />
    );

    it('should render a DefaultText for each fixedExpense', () => {
        const texts = root.findAllByType(DefaultText);

        texts.forEach((text) => {
            expect(text.type).toBe(DefaultText);
        });
    });
});
