/**
 * Announcement Routes
 * Admins can create, update, delete announcements
 * Students and instructors can view announcements
 */

const express = require("express");
const Announcement = require("../models/Announcement");
const Comment = require("../models/Comment");  // 👈 أضف هذا السطر
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();

// Get all announcements visible to the current user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const role = req.user.role;
    let announcements;
    if (role === "admin" || role === "super_admin") {
      // Admins see all announcements
      announcements = await Announcement.find({})
        .sort({ createdAt: -1 })
        .lean();
    } else {
      // Others see only those visible to their role
      announcements = await Announcement.find({
        visibleTo: role,
      })
        .sort({ createdAt: -1 })
        .lean();
    }
    res.json({ announcements });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch announcements" });
  }
});

// ============================================
// COMMENTS ON GENERAL ANNOUNCEMENTS
// ============================================

// جلب تعليقات إعلان عام
router.get("/:id/comments", authenticateToken, async (req, res) => {
  try {
    const comments = await Comment.find({ announcementId: req.params.id })
      .populate("userId", "fullName email role")
      .sort({ createdAt: 1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// إضافة تعليق على إعلان عام
router.post("/:id/comments", authenticateToken, async (req, res) => {
  try {
    const { text } = req.body;
    const announcementId = req.params.id;

    const announcement = await Announcement.findById(announcementId);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    const comment = new Comment({
      announcementId,
      userId: req.user.id,
      userRole: req.user.role,
      text,
    });

    await comment.save();

    // جلب التعليق مع بيانات المستخدم
    const populatedComment = await Comment.findById(comment._id)
      .populate("userId", "fullName email role");

    res.status(201).json({ success: true, comment: populatedComment });
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({ message: error.message });
  }
});

// حذف تعليق من إعلان عام
router.delete("/:announcementId/comments/:commentId", authenticateToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const isAdmin = ["admin", "super_admin"].includes(req.user.role);
    const isOwner = comment.userId.toString() === req.user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admins: Create announcement
router.post("/", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "super_admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  const { title, message, visibleTo, link } = req.body;
  if (!title || !message) {
    return res.status(400).json({ message: "Title and message required" });
  }
  try {
    const announcement = await Announcement.create({
      title,
      message,
      link,
      createdBy: req.user._id,
      visibleTo:
        visibleTo && Array.isArray(visibleTo) ? visibleTo : ["student"],
    });
    res.status(201).json({ announcement });
  } catch (err) {
    console.error("[ERROR] Failed to create announcement:", err);
    res
      .status(500)
      .json({
        message: "Failed to create announcement",
        error: err.message,
        stack: err.stack,
      });
  }
});

// Admins: Delete announcement
router.delete("/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "super_admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete announcement" });
  }
});

// Admins: Update announcement
router.put("/:id", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin" && req.user.role !== "super_admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  const { title, message, visibleTo, link } = req.body;
  if (!title || !message) {
    return res.status(400).json({ message: "Title and message required" });
  }
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, message, visibleTo, link },
      { new: true },
    );
    if (!updated)
      return res.status(404).json({ message: "Announcement not found" });
    res.json({ announcement: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update announcement" });
  }
});

module.exports = router;