import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {textStyles} from '../../styles/text-styles';
import {FeatherNames} from '../../enums/IconNames';
import {easeInTransition} from '../../services/animation-service';
import {usePrimaryColor} from '../../redux/hooks';

import {RegularText} from './Text';
import Button from './Button';
import Input from './Input';

const styles = StyleSheet.create({
    buttonWrapper: {
        marginLeft: '80%',
        marginTop: 8,
        width: '100%'
    },
    wrapper: {
        alignItems: 'center',
        marginBottom: 8,
        paddingBottom: 8,
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
            <ToggleIcon
                isVisible={isVisible}
                setVisible={setVisible}
                {...props}
            />
            <DropdownForm
                isVisible={isVisible}
                {...props}
            />
        </View>
    );
};

interface IToggleIconProps extends ICreateCategoryFormProps {
    isVisible: boolean
    setVisible: () => void
}

const Icon: FC<IToggleIconProps> = ({isVisible, setVisible}) =>
    <Feather
        color={usePrimaryColor()}
        name={isVisible ? FeatherNames.X_CIRCLE : FeatherNames.PLUS_CIRCLE}
        onPress={setVisible}
        size={50}
    />;

const ToggleIcon: FC<IToggleIconProps> = ({toggleable, isVisible, setVisible, ...props}) => toggleable ?
    <View style={styles.buttonWrapper}>
        <Icon
            isVisible={isVisible}
            setVisible={setVisible}
            {...props}
        />
    </View> : null;

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
