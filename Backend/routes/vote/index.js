const express = require('express');
const Vote = require('../../models/Vote');
const {getTodayDate} = require("../getTodayDate");
const {getTodayPerfume} = require("../weather/getTodayPerfume");
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
        const vote = await Vote.findOne({userId: userId, votedDate: today});
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

/**
 * 투표율 조회 API
 */
router.get('/turnout', async (req, res) => {
    try {
        const count = {};
        const perfumeList = getTodayPerfume();
        perfumeList.map(v => {
            const id = v.id;
            count[id] = 0;
        });

        const todayVotes = await Vote.find({votedDate: new Date(getTodayDate().format('YYYY-MM-DD'))}).exec();
        const total = todayVotes.length;
        todayVotes.map((v) => {
            const perfumeId = v.perfume_id;
            count[perfumeId]++;
        })

        return res.status(200).json({
            success: true,
            turnout: [
                {id: perfumeList[0].id, value: count[perfumeList[0].id]*100/total},
                {id: perfumeList[1].id, value: count[perfumeList[1].id]*100/total},
                {id: perfumeList[2].id, value: count[perfumeList[2].id]*100/total}
            ]
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;
