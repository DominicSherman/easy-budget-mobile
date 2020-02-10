import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {textStyles} from '../../styles/text-styles';
import {RegularText} from '../generic/Text';
import Button from '../generic/Button';
import Input from '../generic/Input';
import {colors} from '../../constants/colors';
import {FeatherNames} from '../../enums/icon-names';
import {easeInTransition} from '../../services/animation-service';

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

const CreateEditCategoryForm: FC<ICreateCategoryFormProps> = (props) => {
    const {
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
    const [isVisible, setIsVisible] = useState(false);
    const setVisible = (): void => {
        easeInTransition();
        setIsVisible(!isVisible);
    };

    return (
        <View style={{marginTop: 16}}>
            {
                toggleable &&
                    <View style={styles.buttonWrapper}>
                        <Feather
                            color={colors.darkerGray}
                            name={isVisible ? FeatherNames.X_CIRCLE : FeatherNames.PLUS_CIRCLE}
                            onPress={setVisible}
                            size={50}
                        />
                    </View>
            }
            {
                (isVisible || !toggleable) &&
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
                            text={'Submit'}
                            wrapperStyle={{marginTop: 16}}
                        />
                    </View>
            }
        </View>
    );
};

export default CreateEditCategoryForm;
