const multer = require('multer')
const upload = multer({ dest: "uploads/" });
const express = require('express')
const router = express.Router()
const {signUp} = require('../controllers/auth.controller')

router.post('/sign_up', upload.array("files"), signUp)

module.exports = router