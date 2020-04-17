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

interface ISavingCategoryItemProps {
    savingCategory: ISavingCategory
}

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
    const typeToComponent = {
        [FormType.CLOSED]: (): null => null,
        [FormType.EDIT]: (): JSX.Element =>
            <EditSavingCategoryForm
                savingCategory={savingCategory}
                toggleExpanded={(): void => toggle(FormType.EDIT)}
            />,
        [FormType.ADD]: (): JSX.Element =>
            <AddRemoveSavingCategoryForm
                savingCategory={savingCategory}
                toggleExpanded={(): void => toggle(FormType.ADD)}
                type={SavingUpdateType.ADD}
            />,
        [FormType.REMOVE]: (): JSX.Element =>
            <AddRemoveSavingCategoryForm
                savingCategory={savingCategory}
                toggleExpanded={(): void => toggle(FormType.REMOVE)}
                type={SavingUpdateType.REMOVE}
            />
    };
    const FormComponent = typeToComponent[formType];

    return (
        <CardView
            onPress={(): void => toggle(FormType.EDIT)}
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
                        onPress={(): void => toggle(FormType.REMOVE)}
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
                        onPress={(): void => toggle(FormType.ADD)}
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
            <FormComponent />
        </CardView>
    );
};

export default SavingCategoryItem;
