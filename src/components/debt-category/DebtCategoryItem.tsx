import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';

import {IDebtCategory} from '../../../autogen/IDebtCategory';
import CardView from '../generic/CardView';
import {CARD_MARGIN, CARD_WIDTH} from '../../constants/dimensions';
import {FontWeight, LargeText, RegularMontserratText, TinyText} from '../generic/Text';
import {easeInTransition} from '../../services/animation-service';
import {centeredColumn} from '../../styles/shared-styles';
import {Color} from '../../constants/color';
import EditDebtCategoryForm from '../debt-category/EditDebtCategoryForm';
import AddRemoveDebtCategoryForm, {DebtUpdateType} from '../debt-category/AddRemoveDebtCategoryForm';
import ColoredText from '../generic/ColoredText';
import {Theme} from '../../services/theme-service';

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
    debtCategory: IDebtCategory
    onPressEdit: () => void
    onPressAdd: () => void
    onPressRemove: () => void
}

interface IDebtCategoryItemProps {
    debtCategory: IDebtCategory
}

const FormComponent: FC<IFormProps> = ({formType, debtCategory, onPressEdit, onPressAdd, onPressRemove}) => {
    if (formType === FormType.EDIT) {
        return (
            <EditDebtCategoryForm
                debtCategory={debtCategory}
                toggleExpanded={onPressEdit}
            />
        );
    } else if (formType === FormType.ADD) {
        return (
            <AddRemoveDebtCategoryForm
                debtCategory={debtCategory}
                toggleExpanded={onPressAdd}
                type={DebtUpdateType.ADD}
            />
        );
    } else if (formType === FormType.REMOVE) {
        return (
            <AddRemoveDebtCategoryForm
                debtCategory={debtCategory}
                toggleExpanded={onPressRemove}
                type={DebtUpdateType.REMOVE}
            />
        );
    }

    return null;
};

const DebtCategoryItem: FC<IDebtCategoryItemProps> = ({debtCategory}) => {
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
                            text={debtCategory.name}
                            theme={Theme.LIGHT_BLUE}
                        />
                    </View>
                    <View style={styles.rightWrapper}>
                        <LargeText>{`$${debtCategory.amount}`}</LargeText>
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
                debtCategory={debtCategory}
                formType={formType}
                onPressAdd={onPressAdd}
                onPressEdit={onPressEdit}
                onPressRemove={onPressRemove}
            />
        </CardView>
    );
};

export default DebtCategoryItem;
