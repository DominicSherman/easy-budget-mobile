import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import {ISavingCategory} from '../../../autogen/ISavingCategory';
import CardView from '../generic/CardView';
import {CARD_MARGIN, CARD_WIDTH} from '../../constants/dimensions';
import {FontWeight, LargeText, RegularMontserratText, TinyText} from '../generic/Text';
import {easeInTransition} from '../../services/animation-service';
import {centeredColumn} from '../../styles/shared-styles';
import {Color} from '../../constants/color';
import ColoredText from '../generic/ColoredText';
import {Theme} from '../../services/theme-service';

import EditSavingCategoryForm from './EditSavingCategoryForm';
import AddRemoveSavingCategoryForm, {SavingUpdateType} from './AddRemoveSavingCategoryForm';

const styles = StyleSheet.create({
    bottomWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        width: '60%'
    },
    leftWrapper: {
        width: '60%'
    },
    rightWrapper: {
        alignItems: 'center',
        flexDirection: 'column',
        width: '40%'
    },
    topWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        width: '100%'
    },
    wrapper: {
        alignItems: 'flex-start',
        borderWidth: 1,
        flexDirection: 'column',
        marginHorizontal: CARD_MARGIN,
        width: CARD_WIDTH
    }
});

const hitSlop = {
    bottom: 24,
    left: 24,
    right: 24,
    top: 24
};

enum FormType {
    EDIT = 'edit',
    ADD = 'add',
    REMOVE = 'remove',
    CLOSED = 'closed'
}

interface IFormProps {
    formType: FormType
    savingCategory: ISavingCategory
    onPressEdit: () => void
    onPressAdd: () => void
    onPressRemove: () => void
}

interface ISavingCategoryItemProps {
    savingCategory: ISavingCategory
}

const FormComponent: FC<IFormProps> = ({formType, savingCategory, onPressEdit, onPressAdd, onPressRemove}) => {
    if (formType === FormType.EDIT) {
        return (
            <EditSavingCategoryForm
                savingCategory={savingCategory}
                toggleExpanded={onPressEdit}
            />
        );
    } else if (formType === FormType.ADD) {
        return (
            <AddRemoveSavingCategoryForm
                savingCategory={savingCategory}
                toggleExpanded={onPressAdd}
                type={SavingUpdateType.ADD}
            />
        );
    } else if (formType === FormType.REMOVE) {
        return (
            <AddRemoveSavingCategoryForm
                savingCategory={savingCategory}
                toggleExpanded={onPressRemove}
                type={SavingUpdateType.REMOVE}
            />
        );
    }

    return null;
};

const SavingCategoryItem: FC<ISavingCategoryItemProps> = ({savingCategory}) => {
    const [formType, setFormType] = useState<FormType>(FormType.CLOSED);
    const toggle = (type: FormType): void => {
        easeInTransition();

        if (formType !== type) {
            setFormType(type);
        } else {
            setFormType(FormType.CLOSED);
        }
    };
    const onPressEdit = (): void => toggle(FormType.EDIT);
    const onPressRemove = (): void => toggle(FormType.REMOVE);
    const onPressAdd = (): void => toggle(FormType.ADD);

    return (
        <CardView
            onPress={onPressEdit}
            shadow
            style={styles.wrapper}
        >
            <View style={[centeredColumn, {width: '100%'}]}>
                <View style={styles.topWrapper}>
                    <View style={styles.leftWrapper}>
                        <ColoredText
                            text={savingCategory.name}
                            theme={Theme.PURPLE}
                        />
                    </View>
                    <View style={styles.rightWrapper}>
                        <LargeText>{`$${savingCategory.amount}`}</LargeText>
                        <TinyText>{'saved'}</TinyText>
                    </View>
                </View>
                <View style={styles.bottomWrapper}>
                    <Touchable
                        hitSlop={hitSlop}
                        onPress={onPressRemove}
                        testID={'remove'}
                    >
                        <RegularMontserratText
                            color={Color.selectedRed}
                            fontWeight={FontWeight.BOLD}
                        >
                            {'- Remove'}
                        </RegularMontserratText>
                    </Touchable>
                    <Touchable
                        hitSlop={hitSlop}
                        onPress={onPressAdd}
                        testID={'plus'}
                    >
                        <RegularMontserratText
                            color={Color.selectedGreen}
                            fontWeight={FontWeight.BOLD}
                        >
                            {'+ Add'}
                        </RegularMontserratText>
                    </Touchable>
                </View>
            </View>
            <FormComponent
                formType={formType}
                onPressAdd={onPressAdd}
                onPressEdit={onPressEdit}
                onPressRemove={onPressRemove}
                savingCategory={savingCategory}
            />
        </CardView>
    );
};

export default SavingCategoryItem;
