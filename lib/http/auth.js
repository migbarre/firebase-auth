const express = require('express');
const auth = require('../auth/firebase/firebase');

const app = express();

app.post('/auth/signin', async function(req, res) {
    try {
        const user = await auth.signin(req.body.email, req.body.password);
        const userId = await user.user.getIdToken();

        res.status(200).json({
            success: true,
            user: {
                email: user.user.email,
                name: user.user.displayName,
                photo: user.user.photoURL,
                uid: user.user.uid
            }
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            error: {
                code: e.code,
                message: e.message
            }
        });
    }
})

app.post('/auth/signup', async function(req, res) {
    try {
        const user = await auth.signup(req.body.email, req.body.password);

        res.status(200).json({
            success: true,
            user: user.user.toJSON()
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            error: {
                code: e.code,
                message: e.message
            }
        });
    }
})

app.put('/auth/updateUser', async function(req, res) {
    try {
        const user = await auth.updateUser(req.body.email, req.body.password, req.body.name, req.body.photo);
        res.status(200).json({
            success: true,
            user: user.user.toJSON()
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            error: {
                code: e.code,
                message: e.message
            }
        });
    }
})

app.post('/auth/signout', async function(req, res) {
    try {
        const user = await auth.signout();
        console.log(user);
        res.status(200).json({
            success: true
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            error: {
                code: e.code,
                message: e.message
            }
        });
    }
})

module.exports = app;