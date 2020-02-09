import {easeInTransition} from '../../src/services/animation-service';

describe('animation service', () => {
    let LayoutAnimation;

    beforeEach(() => {
        LayoutAnimation = require('react-native').LayoutAnimation;
        LayoutAnimation.configureNext = jest.fn();
    });

    describe('easeInTransition', () => {
        it('should call configure next', () => {
            easeInTransition();

            expect(LayoutAnimation.configureNext).toHaveBeenCalledTimes(1);
            expect(LayoutAnimation.configureNext).toHaveBeenCalledWith(LayoutAnimation.Presets.easeInEaseOut);
        });
    });
});
