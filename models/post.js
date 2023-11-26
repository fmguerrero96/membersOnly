const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    title: {type: String, required: true, maxLength: 100},
    message: {type: String, required: true},
    time_stamp: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Post", PostSchema);