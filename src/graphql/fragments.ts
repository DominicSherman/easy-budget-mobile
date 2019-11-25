import {gql} from 'apollo-boost';

export const variableCategoryFragment = gql`
    fragment IVariableCategory on VariableCategory {
        variableCategoryId
        userId
        amount
        name
    }
`;
