# SCENT - Backend   
향수 아카이브 웹사이트의 백엔드 프로젝트입니다. 
<br><br><br>


## 개발 환경 설정
1. dependency 설치
```sh
npm install
```
2. .env 파일 추가 및 환경 변수 설정
   * PORT=5000
   * MONGO_URI
   * SECRET
   * GOOGLE_CLIENT_ID
   * GOOGLE_CLIENT_SECRET
<br><br><br>
 
[comment]: <> (## 기능)

## DB 설계
![DB](https://raw.githubusercontent.com/boonboonscent/boonboonscent/ebb14c5dd453bd109ea0ed64bf131a7939825c45/Backend/db.svg)  
<br><br><br>

[comment]: <> (## API 명세)


## Dependencies
### express
Web framework for Node.js   
[https://github.com/expressjs/express](https://github.com/expressjs/express)

### express-session
Simple session middleware for Express   
[https://github.com/expressjs/session](https://github.com/expressjs/session)

### morgan
HTTP request logger middleware for node.js   
[https://github.com/expressjs/morgan](https://github.com/expressjs/morgan)

### mongoose
MongoDB ODM(Object Document Mapping)   
[https://github.com/Automattic/mongoose](https://github.com/Automattic/mongoose)

### dotenv
Loads environment variables from .env file.   
[https://github.com/motdotla/dotenv](https://github.com/motdotla/dotenv)

### passport
Simple, unobtrusive authentication for Node.js.   
[https://github.com/jaredhanson/passport](https://github.com/jaredhanson/passport)   
* passport-google-oauth: [http://www.passportjs.org/docs/google/](http://www.passportjs.org/docs/google/)

