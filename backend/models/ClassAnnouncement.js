const mongoose = require("mongoose");


const classAnnouncementSchema = new mongoose.Schema(
    {
        fileUrl: { type: String, default: null },
        fileType: { type: String, enum: ['image', 'pdf', null], default: null },

        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        body: {
            type: String,
            required: true,
            trim: true,
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true },

);

module.exports = mongoose.model("ClassAnnouncement", classAnnouncementSchema);