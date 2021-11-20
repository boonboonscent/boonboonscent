const express = require('express');
const User = require('../../models/User');
const Like = require('../../models/Like');
const router = express.Router();

/**
 * 사용자 닉네임 수정 API
 */
router.patch('/nickname', async(req, res) => {
    if(!req.user) {
        return res.status(401).json({
            success: false,
            message: '로그인이 필요합니다.'
        });
    }

    const userId = req.user._id;
    const nickname = req.body.nickname;
    setUserNickname(userId, nickname).then((user) => {
        if(user) {
            return res.status(200).json({
                success: true,
                newNickname: nickname,
                oldNickname: user.nickname
            });
        }
    });

})

async function setUserNickname(userId, nickname) {
    return await User.findByIdAndUpdate(userId, {$set: {'nickname': nickname}}).exec();
}

module.exports = router;
