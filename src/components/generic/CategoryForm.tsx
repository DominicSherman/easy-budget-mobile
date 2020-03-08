import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {textStyles} from '../../styles/text-styles';
import {easeInTransition} from '../../services/animation-service';
import {colors} from '../../constants/colors';

import {RegularText} from './Text';
import Button from './Button';
import Input from './Input';
import PlusMinusIcon from './PlusMinusIcon';

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        width: '100%'
    }
});

interface ICreateCategoryFormProps {
    buttonText: string
    secondButtonText?: string
    disabled?: boolean
    headerText?: string
    setName: Dispatch<SetStateAction<any>>
    name: string
    setAmount: Dispatch<SetStateAction<any>>
    amount: string
    note?: string | null
    setNote?: Dispatch<SetStateAction<any>>
    onPress: () => void
    secondOnPress?: () => void
    toggleable?: boolean
    showCreateForm?: boolean
}

const CategoryForm: FC<ICreateCategoryFormProps> = (props) => {
    const showCreateForm = Boolean(props.showCreateForm);
    const [isVisible, setIsVisible] = useState(showCreateForm);
    const setVisible = (): void => {
        easeInTransition();
        setIsVisible(!isVisible);
    };

    if (props.toggleable) {
        return (
            <View>
                <KeyboardAwareScrollView style={{marginTop: 16}}>
                    <DropdownForm
                        isVisible={isVisible}
                        {...props}
                    />
                </KeyboardAwareScrollView>
                <PlusMinusIcon
                    isOpen={isVisible}
                    setOpen={setVisible}
                />
            </View>
        );
    }

    return (
        <DropdownForm
            isVisible={isVisible}
            {...props}
        />
    );
};

interface IDropdownProps extends ICreateCategoryFormProps {
    isVisible: boolean
}

const DropdownForm: FC<IDropdownProps> = (props) => {
    const {
        buttonText,
        isVisible,
        disabled,
        headerText,
        setName,
        name,
        setAmount,
        amount,
        onPress,
        note,
        setNote,
        toggleable,
        secondButtonText,
        secondOnPress
    } = props;

    if (toggleable && !isVisible) {
        return null;
    }

    return (
        <View style={[styles.wrapper, toggleable && {paddingBottom: 80}]}>
            {
                headerText &&
                    <View style={{justifyContent: 'center'}}>
                        <RegularText style={textStyles.large}>{headerText}</RegularText>
                    </View>
            }
            <Input
                onChange={setName}
                title={'Category Name *'}
                value={name}
            />
            <Input
                keyboardType={'number-pad'}
                onChange={setAmount}
                title={'Category Amount *'}
                value={amount}
            />
            {
                note !== undefined && setNote ?
                    <Input
                        onChange={setNote}
                        title={'Note'}
                        value={note}
                    />
                    :
                    null
            }
            {
                secondButtonText && secondOnPress ?

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%'
                        }}
                    >
                        <Button
                            onPress={secondOnPress}
                            text={secondButtonText}
                            wrapperStyle={{
                                backgroundColor: colors.red,
                                marginTop: 16,
                                width: '48%'
                            }}
                        />
                        <Button
                            disabled={disabled || !name.length || !amount.length}
                            onPress={onPress}
                            text={buttonText}
                            wrapperStyle={{
                                marginTop: 16,
                                width: '48%'
                            }}
                        />
                    </View>
                    :
                    <Button
                        disabled={disabled || !name.length || !amount.length}
                        onPress={onPress}
                        text={buttonText}
                        wrapperStyle={{marginTop: 16}}
                    />
            }
        </View>
    );
};

export default CategoryForm;
