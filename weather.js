const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
require('moment-timezone');

router.get('/weather', function(req, res, next) {
  const url1 = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";

  //발급받은  키값
  
  const key = "vV6%2B8TpZ0C%2B7mKd0HLxSpSChJr9EA%2Bq66GsSBPdh%2BvjP84mzwQ8FFlIrUZo%2BqCPKGmf05dwr3nePnFmszbr2Ug%3D%3D";

  moment.tz.setDefault("Asia/Seoul");
  const date = moment().format('YYYYMMDD');
  const base_time = '0500';
  const nx = '60';
  const ny = '127';
  const dataType = 'XML';

  // url
  const all_url = url1 + '?serviceKey=' + key +  '&dataType=' + dataType + '&base_date=' + date + '&base_time=' + base_time + '&nx='
      + nx + '&ny=' + ny;
  //console.log(all_url);
 
  request(all_url, function (err, res, body) {
     $ = cheerio.load(body);
    console.log("동작구 날씨 예보");
    $('item').each(function (idx) {
      const time = $(this).find('fcstTime').text();
      const weather = $(this).find('category').text();
      const wea_val = $(this).find('fcstValue').text();


      createComment = (json) => {
        try {
            let data = json.response.body.items.item;
            console.log("\ncreateComment: ", data.length);
            let info = {}
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                switch (item.category) {
                    case "SKY":
                        let cloudy = parseInt(item.fcstValue);
                        if (cloudy > 8) {
                            info.sky = '흐림';
                        } else if (cloudy > 5) {
                            info.sky = '구름많음';
                        } else {
                            info.sky = '맑음';
                        }
                        break;
                    case "TMN":
                        info.morning = item.fcstValue;
                        break;
                    case "TMX":
                        info.highest = item.fcstValue;
                        break;
                    default:
                        break;
                }
            }
            
            let r = this.address + " 오늘 날씨는 " + info.sky
            return r;
    

      
      // 출력
      console.log(`시간 : ${time} 날씨 정보 : ${weather} 값 : ${wea_val}`);
     });
  });
});


module.exports = router;