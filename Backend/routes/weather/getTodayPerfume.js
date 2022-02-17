// 임시 함수 - 날씨별 향수 추출 로직 추가 필요함
function getTodayPerfume() {
    const perfumeList = [
        {id: '6145a51b531420e88e843114', product: 'Blackberry & Bay (Cologne)', house: 'Jo Malone', imageName: 'Blackberry_&_Bay_(Cologne)_Jo_Malone.jpg'},
        {id: '6145a51b531420e88e842db1', product: 'DaliA More', house: 'Salvador Dali', imageName: 'DaliA_More_Salvador_Dali.png'},
        {id: '6145a51b531420e88e842eab', product: 'Valentina Acqua Floreale', house: 'Valentino', imageName: 'Valentina_Acqua_Floreale_Valentino.jpg'}
    ];
    return perfumeList;
}

module.exports = {getTodayPerfume};
