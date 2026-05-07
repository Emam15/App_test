const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const ClassAnnouncement = require("../models/ClassAnnouncement");
const Class = require("../models/Class");
const { authenticateToken } = require("../middleware/auth");

// جلب تعليقات إعلان معين
router.get("/announcement/:announcementId", authenticateToken, async (req, res) => {
    try {
        const comments = await Comment.find({ announcementId: req.params.announcementId })
            .populate('userId', 'fullName email role')
            .populate({
                path: 'replies',
                populate: { path: 'userId', select: 'fullName email role' }
            })
            .sort({ createdAt: 1 });
        res.json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// إضافة تعليق جديد
router.post("/", authenticateToken, async (req, res) => {
    try {
        const { announcementId, text, parentCommentId } = req.body;

        // التحقق من صلاحية الوصول للإعلان
        const announcement = await ClassAnnouncement.findById(announcementId);
        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        const classData = await Class.findById(announcement.classId);
        const isInstructor = classData.instructor.toString() === req.user.id;
        const isEnrolled = classData.students.some(s => s.toString() === req.user.id);

        if (!isInstructor && !isEnrolled) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const comment = new Comment({
            announcementId,
            userId: req.user.id,
            userRole: req.user.role,
            text,
            parentCommentId: parentCommentId || null,
        });

        await comment.save();

        // إذا كان رد على تعليق آخر، أضف الـ reply ID
        if (parentCommentId) {
            await Comment.findByIdAndUpdate(parentCommentId, {
                $push: { replies: comment._id }
            });
        }

        res.status(201).json({ success: true, comment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// حذف تعليق (للدكتور أو الأدمن فقط)
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        const announcement = await ClassAnnouncement.findById(comment.announcementId);
        const classData = await Class.findById(announcement.classId);
        const isInstructor = classData.instructor.toString() === req.user.id;
        const isAdmin = ["admin", "super_admin"].includes(req.user.role);

        if (!isInstructor && !isAdmin && comment.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await comment.deleteOne();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;