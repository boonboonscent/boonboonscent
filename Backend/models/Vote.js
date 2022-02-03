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
        type: Number,

        // 1맑음, 2구름조금, 3구름많음, 4흐림, 5비, 6눈
        max: 6,
        min: 1,

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
