const express = require("express");
const router = express.Router();
const ClassAnnouncement = require("../models/ClassAnnouncement");
const Class = require("../models/Class");
const { authenticateToken } = require("../middleware/auth");

// إنشاء إعلان جديد في كلاس (للدكتور فقط)
router.post("/", authenticateToken, async (req, res) => {
    try {
        const { classId, title, body } = req.body;

        if (!classId || !title || !body) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // التحقق أن الدكتور له صلاحية على هذا الكلاس
        const classData = await Class.findById(classId);
        if (!classData) {
            return res.status(404).json({ message: "Class not found" });
        }

        if (classData.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const announcement = await ClassAnnouncement.create({
            classId,
            title,
            body,
            instructor: req.user.id,
        });

        res.status(201).json({ success: true, announcement });
    } catch (error) {
        console.error("Create class announcement error:", error);
        res.status(500).json({ message: error.message });
    }
});

// جلب إعلانات كلاس معين (للدكتور والطلاب المنضمين)
router.get("/class/:classId", authenticateToken, async (req, res) => {
    try {
        const { classId } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;

        const classData = await Class.findById(classId);
        if (!classData) {
            return res.status(404).json({ message: "Class not found" });
        }

        // التحقق من صلاحية الوصول
        const isInstructor = classData.instructor.toString() === userId;
        const isEnrolled = classData.students.some(s => s.toString() === userId);
        const isAdmin = ["admin", "super_admin"].includes(userRole);

        if (!isInstructor && !isEnrolled && !isAdmin) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const announcements = await ClassAnnouncement.find({ classId })
            .sort({ createdAt: -1 })
            .populate("instructor", "fullName email");

        res.json({ success: true, announcements });
    } catch (error) {
        console.error("Fetch class announcements error:", error);
        res.status(500).json({ message: error.message });
    }
});

// حذف إعلان (للدكتور فقط)
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const announcement = await ClassAnnouncement.findById(req.params.id);
        if (!announcement) {
            return res.status(404).json({ message: "Announcement not found" });
        }

        const classData = await Class.findById(announcement.classId);
        if (!classData) {
            return res.status(404).json({ message: "Class not found" });
        }

        if (classData.instructor.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await announcement.deleteOne();
        res.json({ success: true, message: "Announcement deleted" });
    } catch (error) {
        console.error("Delete class announcement error:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;