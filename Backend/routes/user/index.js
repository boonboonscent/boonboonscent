const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const multer = require('multer');
const path = require('path');

/**
 * 사용자 프로필 수정 API
 */
const profileImage = multer({ storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/images/');
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    })
});
router.post('/profile', profileImage.single('profile_image'), async (req, res) => {

    if(!req.user) {
        return res.status(401).json({
            success: false,
            message: '로그인이 필요합니다.'
        });
    }
    const userId = req.user._id;
    const nickname = req.body.nickname;

    // 닉네임, 이미지이름 수정
    setUser(userId, nickname, req.file.path).then((user) => {
        if(user) {
            return res.status(200).json({
                success: true,
                user: {
                    nickname: user.nickname,
                    image: user.image
                }
            });
        }
    });
})

async function setUser(userId, nickname, image) {
    return await User.findByIdAndUpdate(userId,
        {$set: {nickname: nickname, image: image}},
        {new: true}).exec();
}

/**
 * 닉네임 중복 검사 API
 */
router.get('/profile', async (req, res) => {
    const nickname = req.query.nickname;
    const user = await findUserByNickname(req.user_id, nickname);
    if(user) {
        res.json({
            duplicated: true,
            nickname: nickname,
            message: '중복된 닉네임 입니다.'
        })
    } else {
        res.json({
            duplicated: false,
            nickname: nickname,
            message: '사용 가능한 닉네임 입니다.'
        })
    }
})

async function findUserByNickname(userId, nickname) {
    const user = await User.findOne({nickname: nickname, _id: {$ne: userId}}).exec();
    return user;
}



module.exports = router;
