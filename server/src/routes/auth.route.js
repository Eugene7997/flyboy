const multer = require('multer')
const upload = multer({ dest: "uploads/" });
const express = require('express')
const router = express.Router()
const {signUp, signIn} = require('../controllers/auth.controller')

router.post('/sign_up', upload.array("files"), signUp)
router.post('/sign_in', upload.array("files"), signIn)

module.exports = router