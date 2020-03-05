const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    city: {
        type: String,
        enum: ["Helsinki", "Turku"]
    },
    line: {
        type: String
    },
    happeningTime: {
        type: Date
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model("Post", postSchema);
