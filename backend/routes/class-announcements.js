
const express = require("express");
const path = require("path");
const fs = require("fs");

const ClassAnnouncement = require("../models/ClassAnnouncement");
const AnnouncementComment = require("../models/Comment");
const Class = require("../models/Class");

const { authenticateToken } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();


/* ─────────────────────────────────────────────────────────────
   Scheduler
───────────────────────────────────────────────────────────── */
let _schedulerStarted = false;

function startAnnouncementScheduler() {
    if (_schedulerStarted) return;

    _schedulerStarted = true;

    setInterval(async () => {
        try {
            const result = await ClassAnnouncement.updateMany(
                {
                    status: "scheduled",
                    scheduledAt: { $lte: new Date() },
                },
                {
                    $set: {
                        status: "sent",
                        sentAt: new Date(),
                    },
                }
            );

            if (result.modifiedCount > 0) {
                console.log(
                    `[Scheduler] Published ${result.modifiedCount} announcement(s)`
                );
            }
        } catch (err) {
            console.error("[Scheduler Error]", err.message);
        }
    }, 60000);

    console.log("[Scheduler] Started");
}

/* ─────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────── */

function decodeOriginalName(raw) {
    if (!raw) return "attachment";

    try {
        return Buffer.from(raw, "latin1").toString("utf8");
    } catch {
        return raw;
    }
}

function deleteUploadedFile(fileUrl) {
    try {
        if (!fileUrl) return;

        const rel = fileUrl.replace(/^\/uploads\//, "");
        const abs = path.join(__dirname, "../uploads", rel);

        if (fs.existsSync(abs)) {
            fs.unlinkSync(abs);
        }
    } catch (err) {
        console.error("[Delete File Error]", err.message);
    }
}

function parseLinks(raw) {
    let arr = raw;

    if (typeof arr === "string") {
        try {
            arr = JSON.parse(arr);
        } catch {
            return [];
        }
    }

    if (!Array.isArray(arr)) return [];

    return arr
        .map((item) => {
            if (typeof item === "string") {
                return {
                    label: item,
                    url: item,
                };
            }

            if (item && typeof item === "object" && item.url) {
                return item;
            }

            return null;
        })
        .filter(Boolean);
}

/* ─────────────────────────────────────────────────────────────
   GET CLASS ANNOUNCEMENTS
   Compatible with old frontend:
   GET /class/:classId
───────────────────────────────────────────────────────────── */

router.get("/class/:classId", authenticateToken, async (req, res) => {
    try {
        const { classId } = req.params;
        const { role } = req.user;

        const now = new Date();

        let query;

        if (role === "instructor") {
            query = {
                classId,
                visibleTo: { $in: [role] },
                $or: [
                    { createdBy: req.user._id },
                    { status: "sent" },
                    { status: { $exists: false } },
                    { status: null },
                ],
            };
        } else {
            query = {
                classId,
                visibleTo: { $in: [role] },
                $or: [
                    { status: "sent" },
                    { status: "scheduled", scheduledAt: { $lte: now } },
                    { status: { $exists: false } },
                    { status: null },
                ],
            };
        }

        const announcements = await ClassAnnouncement.find(query)
            .sort({ createdAt: -1 })
            .populate("createdBy", "fullName email")
            .populate("instructor", "fullName email")
            .lean();

        const ids = announcements.map((a) => a._id);

        const counts = await AnnouncementComment.aggregate([
            {
                $match: {
                    announcementId: { $in: ids },
                },
            },
            {
                $group: {
                    _id: "$announcementId",
                    count: { $sum: 1 },
                },
            },
        ]);

        const countMap = {};

        counts.forEach((c) => {
            countMap[String(c._id)] = c.count;
        });

        const normalizedAnnouncements = announcements.map((a) => ({
            ...a,
            body: a.message,
            instructor: a.createdBy || a.instructor,
            commentCount: countMap[String(a._id)] || 0,
        }));

        res.json({
            success: true,
            announcements: normalizedAnnouncements,
        });
    } catch (err) {
        console.error("[Fetch Announcements Error]", err);

        res.status(500).json({
            success: false,
            message: "Failed to fetch class announcements",
        });
    }
});

/* ─────────────────────────────────────────────────────────────
   CREATE ANNOUNCEMENT
───────────────────────────────────────────────────────────── */

// router.post(
//     "/",
//     authenticateToken,
//     upload.array("files", 10),
//     async (req, res) => {
//         try {
//             if (req.user.role !== "instructor") {
//                 return res.status(403).json({
//                     success: false,
//                     message: "Forbidden",
//                 });
//             }

//             let {
//                 classId,
//                 title,
//                 body,
//                 message,
//                 visibleTo,
//                 links,
//                 scheduledAt,
//                 sendNow,
//                 isAiGenerated,
//             } = req.body || {};

//             message = message || body;

//             if (!classId || !title || !message) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Missing required fields",
//                 });
//             }

//             const classData = await Class.findById(classId);

//             if (!classData) {
//                 return res.status(404).json({
//                     success: false,
//                     message: "Class not found",
//                 });
//             }

//             if (String(classData.instructor) !== String(req.user.id)) {
//                 return res.status(403).json({
//                     success: false,
//                     message: "Not authorized",
//                 });
//             }

//             let attachments = (req.files || []).map((f) => ({
//                 fileUrl: "/uploads/" + f.filename,
//                 originalName: decodeOriginalName(f.originalname),
//                 mimetype: f.mimetype,
//                 size: f.size,
//             }));

//             const parsedLinks = parseLinks(links);

//             let visibleToArr = ["student", "instructor"];

//             if (visibleTo && Array.isArray(visibleTo)) {
//                 visibleToArr = visibleTo;
//             } else if (typeof visibleTo === "string") {
//                 try {
//                     const parsed = JSON.parse(visibleTo);

//                     if (Array.isArray(parsed)) {
//                         visibleToArr = parsed;
//                     }
//                 } catch { }
//             }

//             const wantsSchedule =
//                 sendNow === "false" || sendNow === false;

//             let status = "sent";
//             let resolvedScheduledAt = null;
//             let sentAt = new Date();

//             if (wantsSchedule && scheduledAt) {
//                 const scheduledDate = new Date(scheduledAt);

//                 if (scheduledDate <= new Date()) {
//                     return res.status(400).json({
//                         success: false,
//                         message: "scheduledAt must be in future",
//                     });
//                 }

//                 status = "scheduled";
//                 resolvedScheduledAt = scheduledDate;
//                 sentAt = null;
//             }

//             const announcement = await ClassAnnouncement.create({
//                 classId,
//                 title,

//                 body: message,
//                 message,

//                 links: parsedLinks,
//                 attachments,

//                 createdBy: req.user._id,
//                 instructor: req.user._id,

//                 visibleTo: visibleToArr,

//                 status,
//                 scheduledAt: resolvedScheduledAt,
//                 sentAt,

//                 isAiGenerated:
//                     isAiGenerated === true ||
//                     isAiGenerated === "true",
//             });

//             res.status(201).json({
//                 success: true,
//                 announcement,
//             });
//         } catch (err) {
//             console.error("[Create Announcement Error]", err);

//             res.status(500).json({
//                 success: false,
//                 message: "Failed to create announcement",
//             });
//         }
//     }
// );


// إنشاء إعلان مع ملف
router.post('/', authenticateToken, upload.single('file'), async (req, res) => {
    try {
        const { classId, title, body } = req.body;
        let fileUrl = null;
        let fileType = null;

        if (req.file) {
            fileUrl = `/uploads/${req.file.filename}`;
            fileType = req.file.mimetype.startsWith('image/') ? 'image' : 'pdf';
        }

        const announcement = new ClassAnnouncement({
            classId, title, body,
            instructor: req.user.id,
            fileUrl, fileType
        });

        await announcement.save();
        res.status(201).json({ success: true, announcement });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/* ─────────────────────────────────────────────────────────────
   UPDATE ANNOUNCEMENT
───────────────────────────────────────────────────────────── */

router.put(
    "/:id",
    authenticateToken,
    upload.array("files", 10),
    async (req, res) => {
        try {
            if (req.user.role !== "instructor") {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden",
                });
            }

            let {
                title,
                body,
                message,
                visibleTo,
                links,
                removeAttachments,
            } = req.body;

            message = message || body;

            if (!title || !message) {
                return res.status(400).json({
                    success: false,
                    message: "Title and message required",
                });
            }

            const announcement = await ClassAnnouncement.findById(
                req.params.id
            );

            if (!announcement) {
                return res.status(404).json({
                    success: false,
                    message: "Announcement not found",
                });
            }

            const classData = await Class.findById(
                announcement.classId
            );

            if (!classData) {
                return res.status(404).json({
                    success: false,
                    message: "Class not found",
                });
            }

            if (String(classData.instructor) !== String(req.user.id)) {
                return res.status(403).json({
                    success: false,
                    message: "Not authorized",
                });
            }

            const parsedLinks = parseLinks(links);

            let visibleToArr = ["student", "instructor"];

            if (visibleTo && Array.isArray(visibleTo)) {
                visibleToArr = visibleTo;
            } else if (typeof visibleTo === "string") {
                try {
                    const parsed = JSON.parse(visibleTo);

                    if (Array.isArray(parsed)) {
                        visibleToArr = parsed;
                    }
                } catch { }
            }

            let removeIds = [];

            if (typeof removeAttachments === "string") {
                try {
                    removeIds = JSON.parse(removeAttachments);
                } catch { }
            } else if (Array.isArray(removeAttachments)) {
                removeIds = removeAttachments;
            }

            if (removeIds.length) {
                const kept = [];

                for (const att of announcement.attachments || []) {
                    const key = String(att._id || att.fileUrl);

                    if (
                        removeIds.some(
                            (id) =>
                                String(id) === key ||
                                String(id) === att.fileUrl
                        )
                    ) {
                        deleteUploadedFile(att.fileUrl);
                    } else {
                        kept.push(att);
                    }
                }

                announcement.attachments = kept;
            }

            if (req.files && req.files.length) {
                announcement.attachments.push(
                    ...req.files.map((f) => ({
                        fileUrl: "/uploads/" + f.filename,
                        originalName: decodeOriginalName(f.originalname),
                        mimetype: f.mimetype,
                        size: f.size,
                    }))
                );
            }

            announcement.title = title;
            announcement.message = message;
            announcement.body = message;
            announcement.links = parsedLinks;
            announcement.visibleTo = visibleToArr;

            await announcement.save();

            res.json({
                success: true,
                announcement,
            });
        } catch (err) {
            console.error("[Update Announcement Error]", err);

            res.status(500).json({
                success: false,
                message: "Failed to update announcement",
            });
        }
    }
);

/* ─────────────────────────────────────────────────────────────
   DELETE ANNOUNCEMENT
───────────────────────────────────────────────────────────── */

router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== "instructor") {
            return res.status(403).json({
                success: false,
                message: "Forbidden",
            });
        }

        const announcement = await ClassAnnouncement.findById(
            req.params.id
        );

        if (!announcement) {
            return res.status(404).json({
                success: false,
                message: "Announcement not found",
            });
        }

        const classData = await Class.findById(
            announcement.classId
        );

        if (!classData) {
            return res.status(404).json({
                success: false,
                message: "Class not found",
            });
        }

        if (String(classData.instructor) !== String(req.user.id)) {
            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }

        (announcement.attachments || []).forEach((a) => {
            if (a.fileUrl) {
                deleteUploadedFile(a.fileUrl);
            }
        });

        await ClassAnnouncement.findByIdAndDelete(req.params.id);

        await AnnouncementComment.deleteMany({
            announcementId: req.params.id,
        });

        res.json({
            success: true,
            message: "Announcement deleted",
        });
    } catch (err) {
        console.error("[Delete Announcement Error]", err);

        res.status(500).json({
            success: false,
            message: "Failed to delete announcement",
        });
    }
});

/* ─────────────────────────────────────────────────────────────
   COMMENTS
───────────────────────────────────────────────────────────── */

router.get(
    "/:announcementId/comments",
    authenticateToken,
    async (req, res) => {
        try {
            const comments = await AnnouncementComment.find({
                announcementId: req.params.announcementId,
            }).sort({ createdAt: 1 });

            res.json({
                success: true,
                comments,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch comments",
            });
        }
    }
);

router.post(
    "/:announcementId/comments",
    authenticateToken,
    async (req, res) => {
        try {
            const content = (req.body.content || "").trim();

            if (!content) {
                return res.status(400).json({
                    success: false,
                    message: "Comment required",
                });
            }

            const announcement = await ClassAnnouncement.findById(
                req.params.announcementId
            );

            if (!announcement) {
                return res.status(404).json({
                    success: false,
                    message: "Announcement not found",
                });
            }

            const comment = await AnnouncementComment.create({
                announcementId: req.params.announcementId,
                classId: announcement.classId,

                author: req.user._id,
                authorName:
                    req.user.fullName ||
                    req.user.name ||
                    "Unknown",

                authorRole: req.user.role,
                content,
            });

            res.status(201).json({
                success: true,
                comment,
            });
        } catch (err) {
            console.error("[Create Comment Error]", err);

            res.status(500).json({
                success: false,
                message: "Failed to create comment",
            });
        }
    }
);

router.put(
    "/:announcementId/comments/:commentId",
    authenticateToken,
    async (req, res) => {
        try {
            const comment = await AnnouncementComment.findById(
                req.params.commentId
            );

            if (!comment) {
                return res.status(404).json({
                    success: false,
                    message: "Comment not found",
                });
            }

            if (String(comment.author) !== String(req.user._id)) {
                return res.status(403).json({
                    success: false,
                    message: "Not authorized",
                });
            }

            comment.content = req.body.content;
            comment.editedAt = new Date();

            await comment.save();

            res.json({
                success: true,
                comment,
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Failed to update comment",
            });
        }
    }
);

router.delete(
    "/:announcementId/comments/:commentId",
    authenticateToken,
    async (req, res) => {
        try {
            const comment = await AnnouncementComment.findById(
                req.params.commentId
            );

            if (!comment) {
                return res.status(404).json({
                    success: false,
                    message: "Comment not found",
                });
            }

            const isOwner =
                String(comment.author) === String(req.user._id);

            let canDelete = isOwner;

            if (!canDelete && req.user.role === "instructor") {
                const announcement = await ClassAnnouncement.findById(
                    req.params.announcementId
                );

                if (
                    announcement &&
                    String(announcement.createdBy) ===
                    String(req.user._id)
                ) {
                    canDelete = true;
                }
            }

            if (!canDelete) {
                return res.status(403).json({
                    success: false,
                    message: "Not authorized",
                });
            }

            await AnnouncementComment.findByIdAndDelete(
                req.params.commentId
            );

            res.json({
                success: true,
                message: "Comment deleted",
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Failed to delete comment",
            });
        }
    }
);

module.exports = router;
module.exports.startAnnouncementScheduler =
    startAnnouncementScheduler;

