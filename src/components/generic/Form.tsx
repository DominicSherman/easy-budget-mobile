import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {easeInTransition} from '../../services/animation-service';
import {centeredRow} from '../../styles/shared-styles';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {Color} from '../../constants/color';
import {useDarkBlueColor} from '../../utils/hooks';

import {FontWeight, RegularMontserratText} from './Text';
import Button, {IButtonProps} from './Button';
import Input, {IInputProps} from './Input';
import PlusMinusIcon from './PlusMinusIcon';
import Toggle, {IToggleProps} from './Toggle';

const FORM_HEIGHT = 475;

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
        backgroundColor: Color.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        width: '100%'
    }
});

interface IToggleProp extends IToggleProps {
    isToggle: true
}

interface IInputProp extends IInputProps {
    isToggle?: false
}

export type IFormInput = (IToggleProp | IInputProp)

interface IFormProps {
    buttons: IButtonProps[]
    inputs: IFormInput[]
    headerText?: string
    toggleable?: boolean
    visibleByDefault?: boolean
}

const Form: FC<IFormProps> = (props) => {
    const visibleByDefault = Boolean(props.visibleByDefault);
    const [isVisible, setIsVisible] = useState(visibleByDefault);
    const setVisible = (): void => {
        easeInTransition();
        setIsVisible(!isVisible);
    };

    if (props.toggleable) {
        return (
            <View>
                <KeyboardAwareScrollView
                    extraHeight={FORM_HEIGHT}
                >
                    {isVisible && <DropdownForm {...props} />}
                </KeyboardAwareScrollView>
                <PlusMinusIcon
                    isOpen={isVisible}
                    setOpen={setVisible}
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
        <View style={[styles.wrapper, toggleable && styles.toggledWrapper]}>
            {
                headerText &&
                    <View style={{justifyContent: 'center'}}>
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
                    input.isToggle ?
                        <Toggle
                            key={input.title}
                            {...input}
                        />
                        :
                        <Input
                            key={input.title}
                            {...input}
                        />
                )
            }
            <View style={styles.buttonWrapper}>
                {
                    buttons.map((button) =>
                        <Button
                            key={button.text}
                            {...button}
                            wrapperStyle={{
                                padding: 12,
                                width: (SCREEN_WIDTH - 84) / buttons.length,
                                ...button.wrapperStyle || {}
                            }}
                        />
                    )
                }
            </View>
        </View>
    );
};

export default Form;
