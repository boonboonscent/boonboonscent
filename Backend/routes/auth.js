const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// 회원가입
router.post('/register', async (req,res, next) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(user) {
            return res.redirect('/register?error=exist');
        }
        const hash = await bcrypt.hash(req.body.password, 12);
        await User.create({
            email: req.body.email,
            password: hash
        });
        return res.send('회원가입 완료');
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

// 로컬 로그인
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.send('로그인 완료');
        });
    })(req, res, next);
});

// 로컬 로그아웃
router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('로그아웃');
});

// 구글 로그인
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
    }), (req, res) => {
        // res.send(`${req.query} 님 환영합니다.`);
        res.redirect('/');
});

module.exports = router;
