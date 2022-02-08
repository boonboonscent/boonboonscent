const express = require('express');
const router = express.Router();
const moment = require('moment');
require('moment-timezone');
const axios = require('axios');
const weatherType = require('./weatherType');

/**
 * 날씨 API
 * date(날짜, YYYYMMDD), weather(날씨), temperature(기온) 리턴
*/
router.get('/', async function(req, res) {
    try{
        const result = await getWeather();
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

        return res.status(200).json({
            'success': true,
            'data': {
                date, weather, temperature
            }
        });
    } catch(err) {
        return res.status(400).json({'success': false, 'message': err.message})
    }

})

/**
 * 기상청 API로부터 오늘 날씨 정보를 요청한다.
 */
function getWeather() {
    const base_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
    //발급받은  키값
    const key = "vV6%2B8TpZ0C%2B7mKd0HLxSpSChJr9EA%2Bq66GsSBPdh%2BvjP84mzwQ8FFlIrUZo%2BqCPKGmf05dwr3nePnFmszbr2Ug%3D%3D";
    const dataType = 'JSON';
    moment.tz.setDefault("Asia/Seoul");
    const date = moment().format('YYYYMMDD');
    const base_time = '1100';
    const nx = '59';
    const ny = '125';

    const url = base_url + '?' +
                'serviceKey=' + key + '&' +
                'dataType=' + dataType + '&' +
                'base_date=' + date + '&' +
                'base_time=' + base_time + '&' +
                'nx=' + nx + '&' +
                'ny=' + ny;

    return axios({
        method: 'GET',
        url: url
    })
}

module.exports = router;


















