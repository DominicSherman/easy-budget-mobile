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
    GoogleSignin: {
        configure: jest.fn(),
        isSignedIn: jest.fn(),
        signIn: jest.fn(),
        signOut: jest.fn()
    },
    GoogleSigninButton
};
