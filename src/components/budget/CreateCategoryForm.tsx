import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {View, LayoutAnimation, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {textStyles} from '../../styles/text-styles';
import DefaultText from '../generic/DefaultText';
import Button from '../generic/Button';
import Input from '../generic/Input';
import {colors} from '../../constants/colors';

const styles = StyleSheet.create({
    buttonWrapper: {
        marginLeft: '80%',
        marginTop: 8,
        width: '100%'
    },
    wrapper: {
        alignItems: 'center',
        borderBottomColor: colors.darkGray,
        borderBottomWidth: 2,
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
    const [isVisible, setIsVisible] = useState(true);
    const setVisible = (): void => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsVisible(!isVisible);
    };

    return (
        <View>
            <View style={styles.buttonWrapper}>
                <Feather
                    color={colors.darkerGray}
                    name={isVisible ? 'x-circle' : 'plus-circle'}
                    onPress={setVisible}
                    size={50}
                />
            </View>
            {
                isVisible &&
                    <View style={styles.wrapper}>
                        <View style={{justifyContent: 'center'}}>
                            <DefaultText style={textStyles.large}>{'Add Category'}</DefaultText>
                        </View>
                        <Input
                            onChange={setName}
                            title={'Category Name'}
                            value={name}
                        />
                        <Input
                            keyboardType={'number-pad'}
                            onChange={setAmount}
                            title={'Category Amount'}
                            value={amount}
                        />
                        <Button
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
