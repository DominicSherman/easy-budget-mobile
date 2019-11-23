const firebase = {
    auth: jest.fn()
};

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
firebase.auth.GoogleAuthProvider = {
    credential: jest.fn()
};

module.exports = firebase;
