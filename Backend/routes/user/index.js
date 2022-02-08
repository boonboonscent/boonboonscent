const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Like = require("../../models/Like");
const Vote = require("../../models/Vote");

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
    const userId = req.user_id;
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

/**
 * 좋아요한 향수 조회 API
 */
router.get('/like', async (req, res) => {
    const userId = req.user._id;
    const likeList = await Like.find({user_id: userId}, 'perfume_id')
        .populate('perfume_id', 'product house image_name');
    const likedPerfumeList = likeList.map((like) => {
            return {
                product: like.perfume_id.product,
                house: like.perfume_id.house,
                image_name: like.perfume_id.image_name
            }
        })

    return res.json({
        data: likedPerfumeList
    });
})


/**
 * 투표한 향수 조회 API
 */
router.get('/vote', async (req, res) => {
    try {
        const userId = req.user._id;
        const voteList = await Vote.find({user_id: userId}, ['perfume_id', 'weather', 'votedDate', 'temperature'])
            .populate('perfume_id', 'product house image_name');
        const data = voteList.map((vote) => {
            return {
                date: vote.votedDate,
                weather: vote.weather,
                temperature: vote.temperature,
                product: vote.perfume_id.product,
                house: vote.perfume_id.house,
                image_name: vote.perfume_id.image_name
            }
        })

        return res.status(200).json({
            success: true,
            data: data
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
})

module.exports = router;
