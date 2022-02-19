const express = require('express');
const Vote = require('../../models/Vote');
const {getTodayDate} = require("../getTodayDate");
const router = express.Router();

/**
 * 투표 API
 */
router.post('/', async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            success: false,
            message: '로그인이 필요합니다.'
        });
    }
    const userId = req.user._id;
    const perfumeId = req.body.perfume_id;
    const weather = req.body.weather;
    const temperature = req.body.temperature;
    const date = req.body.date; //YYYYMMDD
    //YYYY-MM-DD 형태로 변환
    const convertedDate = date.substr(0, 4) + '-' +
                        date.substr(4, 2) + '-' +
                        date.substr(6, 2);

    try{
        await votePerfume(userId, perfumeId, weather, temperature, convertedDate);
        return res.status(200).json({success: true});
    } catch (err) {
        return res.status(400).json({success: false, message: err.message});
    }
})

function votePerfume(userId, perfumeId, weather, temperature, date) {
    return Vote.create({
        user_id: userId,
        perfume_id: perfumeId,
        weather: weather,
        temperature: temperature,
        votedDate: new Date(date)
    })
}

/**
 * 투표 여부 확인 API
 */
router.get('/', async (req, res) => {
    if(!req.user) {
        return res.status(401).json({
            success: false,
            message: '로그인이 필요합니다.'
        });
    }
    const userId = req.user._id;
    const today = new Date(getTodayDate().format('YYYY-MM-DD'));

    try{
        const vote = await Vote.findOne({user_id: userId, votedDate: today});

        if(vote) {
            return res.status(200).json({
                success: true,
                voted: true,
                perfume: vote.perfume_id
            });
        } else {
            return res.status(200).json({
                success: true,
                voted: false,
                perfume: null
            });
        }
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
})

module.exports = router;
