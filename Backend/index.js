const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const passportConfigure = require('./passport/index');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors({origin: 'http://localhost:4000'}));
passportConfigure();

// MongoDB connect
mongoose.connect(process.env.MONGO_URI
    , (error) => {
    if(error) console.log(error);
    else console.log('MongoDB Connected!!');
})

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
const perfumeRouter = require('./routes/perfume');
const perfumeLikeRouter = require('./routes/perfume/like');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const weatherRouter = require('./routes/weather');
const voteRouter = require('./routes/vote');

app.use('/api/perfume', perfumeRouter);
app.use('/api/perfume/like', perfumeLikeRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/vote', voteRouter);

app.use((req, res) => {
    if(req.user) {
        return res.send(`${req.user.nickname} 님 환영합니다.`);
    }
    return res.send('환영합니다.');
})

// Port
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
});
