//npm 모듈 사용하는 법 require
const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express();

const users = [];

//middleware함수 추가
app.use(express.json())

//조회하는 get방식 - 함수 실행 req: 클라이언트에서 넘어올 때 모든 정보가 들어있음  res: 클라이언트에게 리턴할 때 들어가는 모든 정보 
app.get('/user', function(req,res){
    //클라이언트에 어떤 정보를 리턴해주고 싶은지 표시 : send
    return res.send({users: users })

})

app.post('/user', function(req, res){
    console.log(req.body)
    //배열에 새로운 element 를 추가하는 문법
    //body라는 곳에 name, age 가  담김, name age 라는 데이터를 보냈을 때 받아가지고 배열에 저장
    users.push({name:req.body.name, age:req.body.age})
    return res.send({ success: ture})

})

//어떤 port에서 듣고 있는가
app.listen(3000, function(){
    console.log('server listening on port 3000');
})

