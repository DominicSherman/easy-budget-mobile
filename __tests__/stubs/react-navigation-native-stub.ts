module.exports = {
    useNavigation: jest.fn(() => ({
        navigation: {
            navigate: jest.fn()
        }
    }))
};
