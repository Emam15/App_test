const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    announcementId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassAnnouncement",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userRole: {
        type: String,
        enum: ["student", "instructor"],
        required: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);