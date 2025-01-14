const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  updateUserByAdmin,
} = require("../controller/userController");

router.get("/", getAllUsers);
router.put("/update/:id", updateUserByAdmin);

module.exports = router;
