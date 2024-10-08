// import ....
const express = require('express')
const router = express.Router()
// import controller
const { register, login, currentUser } = require('../controllers/auth')
// import Middleware
const { authCheck, adminCheck } = require('../middlewares/authCheck')

router.post('/register', register)
router.post('/login', login)
router.post('/current-user', authCheck, currentUser)
router.post('/current-admin', authCheck, adminCheck, currentUser)

module.exports = router