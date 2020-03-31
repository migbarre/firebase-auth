const firebase = require("firebase");
const admin = require('firebase-admin');

const serviceAccount = require("../../config/service-account-file.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: ""
});

firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
});

const signin = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}

const signup = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

const updateUser = async(email, password, name, photoUrl) => {
    let user = await firebase.auth().signInWithEmailAndPassword(email, password);

    await user.user.updateProfile({
        displayName: name,
        photoURL: photoUrl
    });

    return user;
}

const signout = async() => {
    return await firebase.auth().signOut();
}

module.exports = {
    signin,
    signup,
    signout,
    updateUser
}