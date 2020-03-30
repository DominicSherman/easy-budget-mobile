import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {textStyles} from '../../styles/text-styles';
import {easeInTransition} from '../../services/animation-service';
import {centeredRow} from '../../styles/shared-styles';
import {SCREEN_WIDTH} from '../../constants/dimensions';

import {RegularText} from './Text';
import Button, {IButtonProps} from './Button';
import Input, {IInputProps} from './Input';
import PlusMinusIcon from './PlusMinusIcon';
import Toggle, {IToggleProps} from './Toggle';

const styles = StyleSheet.create({
    buttonWrapper: {
        ...centeredRow,
        justifyContent: 'space-evenly',
        marginTop: 16,
        width: '100%'
    },
    toggledWrapper: {
        minHeight: 425,
        paddingVertical: 80
    },
    wrapper: {
        alignItems: 'center',
        width: '100%'
    }
});

interface IToggleProp extends IToggleProps {
    isToggle: true
}

interface IInputProp extends IInputProps {
    isToggle: false
}

interface IFormProps {
    buttons: IButtonProps[]
    inputs: (IToggleProp | IInputProp)[]
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
                <KeyboardAwareScrollView style={{marginTop: 16}}>
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

    return (
        <View style={[styles.wrapper, toggleable && styles.toggledWrapper]}>
            {
                headerText &&
                    <View style={{justifyContent: 'center'}}>
                        <RegularText style={textStyles.large}>{headerText}</RegularText>
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
                                width: (SCREEN_WIDTH - 72) / buttons.length,
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
