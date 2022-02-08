const mongoose = require('mongoose');
const { Schema } = mongoose;

const voteSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    perfume_id: {
        type: Schema.Types.ObjectId,
        ref: 'Perfume',
        required: true
    },
    weather: {
        type: String,
        enum: ['맑음', '흐림', '비', '눈'],
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    votedDate: {
        type: Date,
        default: Date.now
    }
});

const Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote;
