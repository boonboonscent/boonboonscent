const express = require('express');
const router = express.Router();
const passport = require('passport');

// 구글 로그인
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
    }), (req, res) => {
        res.status(200).json({success: true, user: req.user});
});

module.exports = router;
