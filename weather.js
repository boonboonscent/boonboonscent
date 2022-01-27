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
      
      // 출력
      console.log(`시간 : ${time} 날씨 정보 : ${weather} 값 : ${wea_val}`);
     });
  });
});


module.exports = router;