module.exports = (api) => {
    api.cache(true);
    const presets = ['module:metro-react-native-babel-preset'];
    const plugins = [
        '@babel/plugin-proposal-nullish-coalescing-operator',
        'babel-plugin-transform-es2015-unicode-regex'
    ];

    return {
        plugins,
        presets
    };
};
