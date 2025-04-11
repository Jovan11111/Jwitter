const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report