/**
 * Admin Routes
 * Handles all admin management operations (delete users, delete classes, view students)
 */

const express = require("express");
const router = express.Router();

const { authenticateToken, authorizeRole } = require("../middleware/auth");
const adminController = require("../controllers/adminController");
const upload = require("../middleware/upload");

// ============================================
// MIDDLEWARE: Apply authentication to all routes
// ============================================
router.use(authenticateToken);
router.use(authorizeRole("admin", "super_admin"));

// ============================================
// USER MANAGEMENT ROUTES
// ============================================

/**
 * DELETE /api/admin/users/:id
 * Delete a user by ID
 * Deletes students from classes, and cascades deletions for instructors
 */
router.delete("/users/:id", adminController.deleteUser);

/**
 * GET /api/admin/users
 * Get all users with pagination and filtering
 * Query params: page, limit, role, search
 */
router.get("/users", adminController.getAllUsers);

// ============================================
// CLASS MANAGEMENT ROUTES
// ============================================

/**
 * GET /api/admin/classes
 * Get all classes with pagination and filtering
 * Query params: page, limit, search
 */
router.get("/classes", adminController.getAllClasses);

/**
 * DELETE /api/admin/classes/:id
 * Delete a class and all related records
 * Cascade deletes assignments, submissions, announcements, attendance sessions, and comments
 */
router.delete("/classes/:id", adminController.deleteClass);

/**
 * GET /api/admin/classes/:id/students
 * Get all students in a class
 * Query params: page, search, sort
 * Returns: class info, instructor info, and paginated student list
 */
router.get("/classes/:id/students", adminController.getClassStudents);
router.post('/upload', authenticateToken, authorizeRole('admin'), upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const fileUrl = `/uploads/${req.file.filename}`;
        res.json({ success: true, fileUrl });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ============================================
// EXPORT
// ============================================

module.exports = router;