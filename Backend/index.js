const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const passportConfigure = require('./passport/index');

dotenv.config();
const app = express();

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

// Routes
const perfumeRouter = require('./routes/perfume');
const authRouter = require('./routes/auth');

app.use('/perfume', perfumeRouter);
app.use('/auth', authRouter);

app.use((req, res) => {
    if(req.session.passport) {
        return res.send(`${req.session.passport.user.nickname} 님 환영합니다.`);
    }
    return res.send('환영합니다.');
})

// Port
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
});
