const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    sns_id: {
        type: String,
        unique: true,
        required: true
    },
    provider: {
        type: String,
        enum: ['google', 'kakao', 'facebook'],
        required: true
    },
    nickname: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
