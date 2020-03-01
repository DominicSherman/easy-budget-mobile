import React, {FC} from 'react';

import EmptyScreen from '../components/generic/EmptyScreen';

const props = {
    subText: 'A variable category is used for categories where you have control over how much you spend. Some examples of these are food, clothes, and entertainment. When you log expenses, you will have to choose one of these variable categories to put that expense into. The app will track how much money you have remaining in that category by subtracting the total of your expenses in it from the amount you budgeted for it.',
    titleText: 'What is a variable category?'
};

const VariableCategoryInfo: FC = () =>
    <EmptyScreen {...props} />;

export default VariableCategoryInfo;
