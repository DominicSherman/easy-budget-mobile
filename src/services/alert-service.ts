import React from 'react';
import DropdownAlert from 'react-native-dropdownalert';

export enum AlertType {
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
    SUCCESS = 'success'
}

export const DropdownRef = React.createRef<DropdownAlert>();

const createAlert = (alertType: AlertType, headerText: string, message: string, payload?: IPayload): void => {
    if (DropdownRef.current) {
        DropdownRef.current.alertWithType(
            alertType,
            headerText,
            message,
            payload,
            payload?.closeInterval
        );
    }
};

interface IPayload {
    closeInterval?: number
    imageSrc?: string | number
    infoImageSrc?: string | number
    warnImageSrc?: string | number
    errorImageSrc?: string | number
    showCancel?: boolean | undefined
    successImageSrc?: string | number
    titleNumOfLines?: number
    messageNumOfLines?: number
}

export const customAlert = (type: AlertType, headerText: string, message: string, payload?: IPayload): void => {
    createAlert(
        type,
        headerText,
        message,
        payload
    );
};

export const errorAlert = (headerText: string, message: string): void => {
    createAlert(AlertType.ERROR, headerText, message);
};

export const infoAlert = (headerText: string, message: string): void => {
    createAlert(AlertType.INFO, headerText, message);
};

export const successAlert = (headerText: string, message: string): void => {
    createAlert(AlertType.SUCCESS, headerText, message);
};

export const warnAlert = (headerText: string, message: string): void => {
    createAlert(AlertType.WARN, headerText, message);
};
