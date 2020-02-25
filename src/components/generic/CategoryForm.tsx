import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {textStyles} from '../../styles/text-styles';
import {FeatherNames} from '../../enums/IconNames';
import {easeInTransition} from '../../services/animation-service';
import {useBackgroundColor, usePrimaryColor} from '../../redux/hooks';
import {SCREEN_WIDTH} from '../../constants/dimensions';

import {RegularText} from './Text';
import Button from './Button';
import Input from './Input';

const styles = StyleSheet.create({
    buttonWrapper: {
        borderRadius: 400,
        borderWidth: 3,
        bottom: 24,
        left: SCREEN_WIDTH - 72,
        paddingHorizontal: 2,
        position: 'absolute'
    },
    wrapper: {
        alignItems: 'center',
        marginBottom: 8,
        paddingBottom: 80,
        width: '100%'
    }
});

interface ICreateCategoryFormProps {
    buttonText: string
    disabled?: boolean
    headerText: string
    setName: Dispatch<SetStateAction<any>>
    name: string
    setAmount: Dispatch<SetStateAction<any>>
    amount: string
    note?: string | null
    setNote?: Dispatch<SetStateAction<any>>
    onPress: () => void
    toggleable?: boolean
}

const CategoryForm: FC<ICreateCategoryFormProps> = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const setVisible = (): void => {
        easeInTransition();
        setIsVisible(!isVisible);
    };

    return (
        <View style={{marginTop: 16}}>
            <DropdownForm
                isVisible={isVisible}
                {...props}
            />
            <ToggleIcon
                isVisible={isVisible}
                setVisible={setVisible}
                {...props}
            />
        </View>
    );
};

interface IToggleIconProps extends ICreateCategoryFormProps {
    isVisible: boolean
    setVisible: () => void
}

const ToggleIcon: FC<IToggleIconProps> = ({toggleable, isVisible, setVisible}) => {
    const primaryColor = usePrimaryColor();
    const themeStyles = {
        backgroundColor: useBackgroundColor(),
        borderColor: primaryColor
    };

    return (
        toggleable ?
            <View style={[styles.buttonWrapper, themeStyles]}>
                <Feather
                    color={primaryColor}
                    name={isVisible ? FeatherNames.X : FeatherNames.PLUS}
                    onPress={setVisible}
                    size={40}
                />
            </View> : null
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
        toggleable
    } = props;

    if (toggleable && !isVisible) {
        return null;
    }

    return (
        <View style={styles.wrapper}>
            <View style={{justifyContent: 'center'}}>
                <RegularText style={textStyles.large}>{headerText}</RegularText>
            </View>
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
            <Button
                disabled={disabled || !name.length || !amount.length}
                onPress={onPress}
                text={buttonText}
                wrapperStyle={{marginTop: 16}}
            />
        </View>
    );
};

export default CategoryForm;
