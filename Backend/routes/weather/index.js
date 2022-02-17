const express = require('express');
const router = express.Router();
const axios = require('axios');
const weatherType = require('./weatherType');
const {getTodayDate} = require("../getTodayDate");
const {getTodayPerfume} = require("./getTodayPerfume");

/**
 * 날씨 API
 * date(날짜, YYYYMMDD), weather(날씨), temperature(기온) 리턴
*/
router.get('/', async function(req, res) {
    try {
        const weatherInfo = await getWeather();
        if (weatherInfo.success) {
            return res.status(200).json(weatherInfo);
        } else {
            return res.status(400).json(weatherInfo);
        }
    } catch (err) {
        return console.log(err);
    }
})

/**
 * 기상청 API로부터 오늘 날씨 정보를 받아온다.
 */
async function getWeather() {
    const base_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
    //발급받은  키값
    const key = "vV6%2B8TpZ0C%2B7mKd0HLxSpSChJr9EA%2Bq66GsSBPdh%2BvjP84mzwQ8FFlIrUZo%2BqCPKGmf05dwr3nePnFmszbr2Ug%3D%3D";
    const dataType = 'JSON';
    const date = getTodayDate().format('YYYYMMDD');    // 오전 5시 10분 전에는 전날 날씨 정보 가져온다.
    const base_time = '0500';
    const nx = '59';
    const ny = '125';

    const url = base_url + '?' +
                'serviceKey=' + key + '&' +
                'dataType=' + dataType + '&' +
                'base_date=' + date + '&' +
                'base_time=' + base_time + '&' +
                'nx=' + nx + '&' +
                'ny=' + ny;

    try{
        const result = await axios({method: 'GET', url: url});
        const items = result.data.response.body.items.item;
        let sky, pty;       //하늘상태, 강수형태,
        let temperature;    //기온
        let date;           //날짜(YYYYMMDD)
        items.map((item) => {
            if(item.category === 'SKY') {
                sky = item.fcstValue;
                date = item.baseDate;
            }
            else if(item.category === 'PTY') {
                pty = item.fcstValue;
            }
            else if(item.category === 'TMP') {
                temperature = item.fcstValue;
            }
        })

        // 날씨
        let weather;
        switch (pty) {
            case '0':   //없음
                switch (sky) {
                    case '1':   //맑음
                        weather = weatherType.SUN;
                        break;
                    case '2':   //구름조금
                    case '3':   //구름많음
                    case '4':   //흐림
                        weather = weatherType.CLOUD;
                        break;
                }
                break;
            case '1':   //비
            case '2':   //비,눈
            case '4':   //소나기
                weather = weatherType.RAIN;
                break;
            case '3':   //눈
                weather = weatherType.SNOW;
                break;
        }
        return { 'success': true, 'data': { date, weather, temperature }};
    } catch(err) {
        return {'success': false, 'message': err.message};
    }
}

/**
 * 오늘의 향수 조회 API
 */
router.get('/perfumes', async (req, res) => {
    const result = await getTodayPerfume();
    if(result.success) {
        return res.status(200).json(result);
    } else {
        return res.status(400).json(result);
    }
})


module.exports = router;


















