import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Touchable from 'react-native-platform-touchable';

import {ISavingCategory} from '../../../autogen/ISavingCategory';
import CardView from '../generic/CardView';
import {SCREEN_WIDTH} from '../../constants/dimensions';
import {LargeText, SmallText} from '../generic/Text';
import {easeInTransition} from '../../services/animation-service';
import EditIcon from '../generic/EditIcon';
import {usePrimaryColor} from '../../utils/hooks';
import {centeredColumn} from '../../styles/shared-styles';
import {FeatherNames} from '../../enums/IconNames';
import {Color} from '../../constants/color';

import EditSavingCategoryForm from './EditSavingCategoryForm';
import AddRemoveSavingCategoryForm, {SavingUpdateType} from './AddRemoveSavingCategoryForm';

const styles = StyleSheet.create({
    topWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        width: '100%'
    },
    verticalCenter: {
        alignItems: 'center',
        flexDirection: 'column'
    },
    wrapper: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginHorizontal: 8,
        width: SCREEN_WIDTH - 16
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
            disabled
            shadow
            style={styles.wrapper}
        >
            <View style={[centeredColumn, {width: '100%'}]}>
                <View style={styles.topWrapper}>
                    <View style={{width: '50%'}}>
                        <LargeText>{savingCategory.name}</LargeText>
                    </View>
                    <View style={styles.verticalCenter}>
                        <LargeText>{`$${savingCategory.amount}`}</LargeText>
                        <SmallText>{'saved'}</SmallText>
                    </View>
                    <EditIcon
                        color={usePrimaryColor()}
                        isOpen={formType === FormType.EDIT}
                        onPress={(): void => toggle(FormType.EDIT)}
                    />
                </View>
                <View style={styles.topWrapper}>
                    <View style={[styles.verticalCenter, {width: '50%'}]}>
                        <Touchable
                            hitSlop={hitSlop}
                            onPress={(): void => toggle(FormType.REMOVE)}
                            testID={'remove'}
                        >
                            <View style={styles.verticalCenter}>
                                <Feather
                                    color={Color.red}
                                    name={FeatherNames.MINUS_CIRCLE}
                                    size={32}
                                />
                                <SmallText>{'remove'}</SmallText>
                            </View>
                        </Touchable>
                    </View>
                    <View style={[styles.verticalCenter, {width: '50%'}]}>
                        <Touchable
                            hitSlop={hitSlop}
                            onPress={(): void => toggle(FormType.ADD)}
                            testID={'plus'}
                        >
                            <View style={styles.verticalCenter}>
                                <Feather
                                    color={Color.green}
                                    name={FeatherNames.PLUS_CIRCLE}
                                    size={32}
                                />
                                <SmallText>{'add'}</SmallText>
                            </View>
                        </Touchable>
                    </View>
                </View>
            </View>
            <FormComponent />
        </CardView>
    );
};

export default SavingCategoryItem;
