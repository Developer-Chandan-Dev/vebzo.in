const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
} = require("../controller/userController");

const { protect, admin, checkRole } = require("../middlewares/authMiddleware");

router.get("/", protect, checkRole("admin"), getAllUsers);
router.put("/update/:id", protect, checkRole("admin"), updateUserByAdmin);
router.delete("/:id", protect, checkRole("admin"), deleteUserByAdmin);

module.exports = router;
