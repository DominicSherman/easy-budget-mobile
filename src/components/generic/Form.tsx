import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {easeInTransition} from '../../services/animation-service';
import {useDarkBlueColor, useSecondaryBackgroundColor} from '../../utils/hooks';
import {Theme} from '../../services/theme-service';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {centeredRow} from '../../styles/shared-styles';

import {FontWeight, RegularMontserratText} from './Text';
import Button, {IButtonProps} from './Button';
import Input, {IInputProps} from './Input';
import PlusMinusIcon from './PlusMinusIcon';
import RecurringToggle, {IRecurringToggleProps} from './RecurringToggle';
import Date, {IDateProps} from './Date';

const FORM_HEIGHT = 400;

const styles = StyleSheet.create({
    buttonWrapper: {
        ...centeredRow,
        justifyContent: 'space-evenly',
        marginTop: 16,
        width: '100%'
    },
    toggledWrapper: {
        minHeight: FORM_HEIGHT,
        paddingTop: 16
    },
    wrapper: {
        alignItems: 'center',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        width: '100%'
    }
});

export enum InputType {
    INPUT = 'input',
    RECURRING_TOGGLE = 'recurring_toggle',
    DATE = 'date'
}

interface IDateProp extends IDateProps {
    inputType: InputType.DATE
}

interface IToggleProp extends IRecurringToggleProps {
    inputType: InputType.RECURRING_TOGGLE
}

interface IInputProp extends IInputProps {
    inputType?: InputType.INPUT
}

export type IFormInput = (IToggleProp | IInputProp | IDateProp)

interface IFormProps {
    buttons: IButtonProps[]
    inputs: IFormInput[]
    theme?: Theme
    headerText?: string
    toggleable?: boolean
    visibleByDefault?: boolean
}

const Form: FC<IFormProps> = (props) => {
    const visibleByDefault = Boolean(props.visibleByDefault);
    const [isVisible, setIsVisible] = useState(visibleByDefault);

    console.log('isVisible', isVisible);

    const setVisible = (): void => {
        easeInTransition();
        setIsVisible(!isVisible);
    };

    if (props.toggleable) {
        return (
            <View>
                <KeyboardAwareScrollView extraScrollHeight={12}>
                    {isVisible && <DropdownForm {...props} />}
                </KeyboardAwareScrollView>
                <PlusMinusIcon
                    isOpen={isVisible}
                    setOpen={setVisible}
                    theme={props.theme}
                />
            </View>
        );
    }

    return (
        <DropdownForm {...props} />
    );
};

const DropdownForm: FC<IFormProps> = (props) => {
    const {
        buttons,
        inputs,
        headerText,
        toggleable
    } = props;
    const darkBlueColor = useDarkBlueColor();

    return (
        <View style={[styles.wrapper, {backgroundColor: useSecondaryBackgroundColor()}, toggleable && styles.toggledWrapper]}>
            {
                headerText &&
                    <View
                        style={{
                            justifyContent: 'center',
                            marginBottom: 8
                        }}
                    >
                        <RegularMontserratText
                            color={darkBlueColor}
                            fontWeight={FontWeight.EXTRA_BOLD}
                        >
                            {headerText}
                        </RegularMontserratText>
                    </View>
            }
            {
                inputs.map((input) =>
                    <InputComponent
                        input={input}
                        key={input.title}
                    />
                )
            }
            <FormButtons buttons={buttons} />
        </View>
    );
};

const InputComponent: FC<{input: IFormInput}> = ({input}) => {
    if (input.inputType === InputType.RECURRING_TOGGLE) {
        return (
            <RecurringToggle {...input} />
        );
    } else if (input.inputType === InputType.DATE) {
        return (
            <Date {...input} />
        );
    }

    return (
        <Input {...input} />
    );
};

const FormButtons: FC<{buttons: IButtonProps[]}> = ({buttons}) =>
    <View style={styles.buttonWrapper}>
        {
            buttons.map((button) =>
                <Button
                    key={button.text}
                    {...button}
                    wrapperStyle={{
                        padding: 12,
                        width: buttons.length > 1 ? (SCREEN_WIDTH - 84) / buttons.length : SCREEN_WIDTH / 2,
                        ...button.wrapperStyle || {}
                    }}
                />
            )
        }
    </View>;

export default Form;
