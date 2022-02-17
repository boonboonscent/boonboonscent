const moment = require('moment');
require('moment-timezone');

// 오전 5시 10분 전까지는 하루 전 moment 객체 반환
function getTodayDate() {
    moment.tz.setDefault("Asia/Seoul");
    const today = moment().subtract(5, "hours").subtract(10, "minutes");
    return today;
}

module.exports = {getTodayDate};
