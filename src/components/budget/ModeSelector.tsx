import React, {FC} from 'react';
import {Switch, View} from 'react-native';

import {useMode} from '../../redux/hooks';
import {TitleText} from '../generic/Text';
import {Mode} from '../../enums/Mode';
import {dispatchAction} from '../../redux/store';
import {Actions} from '../../redux/actions';

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
                onValueChange={(value): void => {
                    dispatchAction(Actions.SET_MODE, value ? Mode.DARK : Mode.LIGHT);
                }}
                value={mode === Mode.DARK}
            />
        </View>
    );
};

export default ModeSelector;
