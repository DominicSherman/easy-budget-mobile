module.exports = {
    'coverageDirectory': '.coverage',
    'collectCoverageFrom': [
        '<rootDir>/src/*/**/*.js',
        '<rootDir>/src/*/**/*.ts',
        '<rootDir>/src/*/**/*.tsx',
        '<rootDir>/index.js'
    ],
    'coveragePathIgnorePatterns': [
        '<rootDir>/src/constants',
        '<rootDir>/src/types',
        '<rootDir>/src/graphql/queries',
        '<rootDir>/src/styles'
    ],
    'coverageThreshold': {
        'global': {
            'branches': 100,
            'functions': 100,
            'lines': 100,
            'statements': 100
        }
    },
    'preset': 'react-native',
    'transformIgnorePatterns': [
        'node_modules/(?!react-native|react-router-native)/'
    ],
    'testMatch': [
        '<rootDir>/__tests__/**/*.test.ts',
        '<rootDir>/__tests__/**/*.test.js',
        '<rootDir>/__tests__/**/*.test.tsx'
    ],
    'moduleNameMapper': {
        'react-native-firebase': '<rootDir>/__tests__/stubs/react-native-firebase-stub.ts',
        'google-signin': '<rootDir>/__tests__/stubs/google-signin-stub.ts',
        'react-native-gesture-handler': '<rootDir>/__tests__/stubs/react-native-gesture-handler-stub.ts',
        'react-native-reanimated': '<rootDir>/__tests__/stubs/react-native-reanimated-stub.ts',
        '@react-navigation/stack': '<rootDir>/__tests__/stubs/react-navigation-stack-stub.ts'
    }
};
