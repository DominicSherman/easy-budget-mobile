import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {LayoutAnimation, StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {textStyles} from '../../styles/text-styles';
import {RegularText} from '../generic/Text';
import Button from '../generic/Button';
import Input from '../generic/Input';
import {colors} from '../../constants/colors';
import {FeatherNames} from '../../enums/icon-names';

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
    setName: Dispatch<SetStateAction<any>>
    name: string
    setAmount: Dispatch<SetStateAction<any>>
    amount: string
    onPress: () => void
}

const CreateCategoryForm: FC<ICreateCategoryFormProps> = (props) => {
    const {
        setName,
        name,
        setAmount,
        amount,
        onPress
    } = props;
    const [isVisible, setIsVisible] = useState(false);
    const setVisible = (): void => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsVisible(!isVisible);
    };

    return (
        <View>
            <View style={styles.buttonWrapper}>
                <Feather
                    color={colors.darkerGray}
                    name={isVisible ? FeatherNames.X_CIRCLE : FeatherNames.PLUS_CIRCLE}
                    onPress={setVisible}
                    size={50}
                />
            </View>
            {
                isVisible &&
                    <View style={styles.wrapper}>
                        <View style={{justifyContent: 'center'}}>
                            <RegularText style={textStyles.large}>{'Add Category'}</RegularText>
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
                        <Button
                            disabled={!name.length || !amount.length}
                            onPress={onPress}
                            text={'Submit'}
                            wrapperStyle={{marginTop: 16}}
                        />
                    </View>
            }
        </View>
    );
};

export default CreateCategoryForm;
