const express = require("express");
const router = express();
const User = require('../models/User')
const middlewareValidation = require('./middleware')
const bcryptjs = require('bcryptjs')
var jwt = require('jsonwebtoken');


const JWT_SECRET = 'eriyfbercbieobu3hrurebuberHBububUOBUOUBuo3728u'

//REGISTRASI NEW USER--------------------------------------------------------------------
router.post("/registrasi", async (req, res) => {
    const { username, email, password } = req.body
    
    const encrypPassword = await bcryptjs.hash(password, 10)
    
    const newUser = new User({
        username: username,
        email: email,
        password: encrypPassword,
    })

    try {
        const olduser = await User.findOne({ email })
        if (olduser) {
            return res.send({ error: "Email Sudah Dipakai" });
        }

        const reg = await newUser.save()
        res.send({ message: "Account Created Successfully" });

    } catch (error) {
        res.json({ message: error })
    }

});

//LOGIN USER--------------------------------------------------------------------
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        return res.json({ status: 'error', message: 'Email Tidak Terdaftar!' })
    }

    if (await bcryptjs.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email, }, JWT_SECRET)

        if (res.status(201)) {
            return res.json({ status: 'ok', data: token, user: user })
        } else {
            return res.json({ error: 'Error ' })
        }
    }

    res.json({ status: 'error', message: 'Password Salah!' })
})


// MIDDLEWARE-------------------------------------------------------------------------------
// router.use((req, res, next) => {
//     // get token from header
//     const token = JSON.parse(req.headers['x-access-token']);
//     // console.log(token.token)

//     // verify token
//     jwt.verify(token.token, JWT_SECRET, (error) => {
//         if (error) {
//             return res.status(401).json({ status: 'error', message: 'Token tidak valid' });
//         } else {
//             next();
//         }
//     });
// });

// ROUTE YANG HANYA BISA AKSES SAMA ADMIN SAJA ATAU YG SUDAH LOGIN------------------------------

router.post('/GetUser',middlewareValidation, async (req, res) => {
    const { token } = req.body
    // console.log('masuk');
    // console.log(token);

    try {
        const user = jwt.verify(token.token, JWT_SECRET)

        const userEmail = user.email

        User.findOne({ email: userEmail })
            .then((data) => {
                res.send({ status: 'ok', data: data })
            }).catch((err) => {
                res.send({ status: 'err', data: err })
            })
    } catch (err) {
        // console.log(err);
        res.json({ status: 'error', message: 'Token is invalid' });
    }

    // res.json({ message: 'Successfully authenticated' });
})


module.exports = router;