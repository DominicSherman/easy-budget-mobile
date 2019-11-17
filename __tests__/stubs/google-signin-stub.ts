const GoogleSigninButton = (): null => null;

GoogleSigninButton.Color = {
    Auto: 0,
    Dark: 2,
    Light: 1
};

GoogleSigninButton.Size = {
    Icon: 0,
    Standard: 1,
    Wide: 2
};

module.exports = {
    configure: jest.fn(),
    GoogleSigninButton
};
