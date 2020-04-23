import Chance from 'chance';

import {
    AlertType,
    customAlert,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DropdownRef,
    errorAlert,
    infoAlert,
    successAlert,
    warnAlert
} from '../../src/services/alert-service';

const chance = new Chance();

describe('alert service', () => {
    let expectedHeaderText,
        expectedMessage,
        alertWithTypeStub;

    beforeEach(() => {
        expectedHeaderText = chance.string();
        expectedMessage = chance.string();
        alertWithTypeStub = jest.fn();

        // @ts-ignore
        DropdownRef = {
            current: {
                alertWithType: alertWithTypeStub
            }
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should not error if DropdownRef.current does not exist', () => {
        // @ts-ignore
        DropdownRef = {};

        expect(() => errorAlert(expectedHeaderText, expectedMessage)).not.toThrow();
    });

    describe('customAlert', () => {
        let expectedAlertType,
            expectedPayload;

        beforeEach(() => {
            expectedAlertType = chance.pickone([
                AlertType.INFO,
                AlertType.WARN,
                AlertType.ERROR,
                AlertType.SUCCESS
            ]);
            expectedPayload = {
                closeInterval: chance.natural()
            };
        });

        it('should create the custom alert', () => {
            customAlert(expectedAlertType, expectedHeaderText, expectedMessage, expectedPayload);

            expect(alertWithTypeStub).toHaveBeenCalledTimes(1);
            expect(alertWithTypeStub).toHaveBeenCalledWith(
                expectedAlertType,
                expectedHeaderText,
                expectedMessage,
                expectedPayload,
                expectedPayload.closeInterval
            );
        });
    });

    describe('errorAlert', () => {
        it('should create the error alert', () => {
            errorAlert(expectedHeaderText, expectedMessage);

            expect(alertWithTypeStub).toHaveBeenCalledTimes(1);
            expect(alertWithTypeStub).toHaveBeenCalledWith(
                AlertType.ERROR,
                expectedHeaderText,
                expectedMessage,
                undefined,
                undefined
            );
        });
    });

    describe('infoAlert', () => {
        it('should create the info alert', () => {
            infoAlert(expectedHeaderText, expectedMessage);

            expect(alertWithTypeStub).toHaveBeenCalledTimes(1);
            expect(alertWithTypeStub).toHaveBeenCalledWith(
                AlertType.INFO,
                expectedHeaderText,
                expectedMessage,
                undefined,
                undefined
            );
        });
    });

    describe('successAlert', () => {
        it('should create the success alert', () => {
            successAlert(expectedHeaderText, expectedMessage);

            expect(alertWithTypeStub).toHaveBeenCalledTimes(1);
            expect(alertWithTypeStub).toHaveBeenCalledWith(
                AlertType.SUCCESS,
                expectedHeaderText,
                expectedMessage,
                undefined,
                undefined
            );
        });
    });

    describe('warnAlert', () => {
        it('should create the warning alert', () => {
            warnAlert(expectedHeaderText, expectedMessage);

            expect(alertWithTypeStub).toHaveBeenCalledTimes(1);
            expect(alertWithTypeStub).toHaveBeenCalledWith(
                AlertType.WARN,
                expectedHeaderText,
                expectedMessage,
                undefined,
                undefined
            );
        });
    });
});
