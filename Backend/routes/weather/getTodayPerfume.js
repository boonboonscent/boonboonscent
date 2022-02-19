// 임시 함수 - 날씨별 향수 추출 로직 추가 필요함
const Vote = require("../../models/Vote");
const {getTodayDate} = require("../getTodayDate");

async function getTodayPerfume() {
    const perfumeList = [
        {id: '6145a51b531420e88e843114', product: 'Blackberry & Bay (Cologne)', house: 'Jo Malone', imageName: 'Blackberry_&_Bay_(Cologne)_Jo_Malone.jpg'},
        {id: '6145a51b531420e88e842db1', product: 'DaliA More', house: 'Salvador Dali', imageName: 'DaliA_More_Salvador_Dali.png'},
        {id: '6145a51b531420e88e842eab', product: 'Valentina Acqua Floreale', house: 'Valentino', imageName: 'Valentina_Acqua_Floreale_Valentino.jpg'}
    ];
    const count = {};

    perfumeList.map(v => {
        const id = v.id;
        count[id] = 0;
    });

    try {
        const todayVotes = await Vote.find({votedDate: new Date(getTodayDate().format('YYYY-MM-DD'))}).exec();
        const total = todayVotes.length;
        todayVotes.map((v) => {
            const perfumeId = v.perfume_id;
            count[perfumeId]++;
        })

        const turnout = [count[perfumeList[0].id] * 100 / total,
                        count[perfumeList[1].id] * 100 / total,
                        count[perfumeList[2].id] * 100 / total];

        return {
            success: true,
            perfumeList: [
                {...perfumeList[0], turnout: turnout[0].toFixed(2)},
                {...perfumeList[1], turnout: turnout[1].toFixed(2)},
                {...perfumeList[2], turnout: turnout[2].toFixed(2)}
            ]
        };
    } catch (err) {
       return {
            success: false,
            message: err.message
        }
}


}

module.exports = {getTodayPerfume};
