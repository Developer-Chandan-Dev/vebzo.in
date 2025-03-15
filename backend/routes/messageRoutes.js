const express = require('express');
const router = express.Router();
const { addMessage, getMessages, deleteMessage } = require('../controller/messagesController')

router.post("/add", addMessage);
router.get("/", getMessages);
router.delete("/:id", deleteMessage);


module.exports = router;