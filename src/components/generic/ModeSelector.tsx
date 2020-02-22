import React, {FC} from 'react';
import {AsyncStorage, Switch, View} from 'react-native';

import {useMode} from '../../redux/hooks';
import {TitleText} from './Text';
import {Mode} from '../../enums/Mode';
import {dispatchAction} from '../../redux/store';
import {Actions} from '../../redux/actions';
import {AsyncStorageKey} from '../../enums/AsyncStorageKey';

const ModeSelector: FC = () => {
    const mode = useMode();

    return (
        <View
            style={{
                alignItems: 'center',
                margin: 16
            }}
        >
            <TitleText style={{marginBottom: 8}}>{'Dark Mode'}</TitleText>
            <Switch
                onValueChange={async (value): Promise<void> => {
                    const mode = value ? Mode.DARK : Mode.LIGHT;

                    dispatchAction(Actions.SET_MODE, mode);
                    await AsyncStorage.setItem(AsyncStorageKey.MODE, mode);
                }}
                value={mode === Mode.DARK}
            />
        </View>
    );
};

export default ModeSelector;
