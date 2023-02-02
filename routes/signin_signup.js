const express = require("express");
const router = express();
const User = require('../models/User')
const middlewareValidation = require('./middleware')
const bcryptjs = require('bcryptjs')
var jwt = require('jsonwebtoken');


const JWT_SECRET = 'eriyfbercbieobu3hrurebuberHBububUOBUOUBuo3728u'

//REGISTRASI NEW USER--------------------------------------------------------------------
router.post("/registrasi", async (req, res) => {
    const { email, password,username } = req.body
    
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

// ROUTE UNTUK MENCARI TOTAL USER YG ADA ------------------------------
router.get('/lenUser', async (req, res) => {

    try {
        const user = await User.find()
        res.json(user.length)
    } catch (err) {
        // console.log(err);
        res.json({ status: 'error', message: 'User Not Found' });
    }

    // res.json({ message: 'Successfully authenticated' });
})




module.exports = router;