const express = require('express')
const router = express.Router();
const cors = require('cors');
const { test,registerUser,loginUser,getprofile } = require('../controllers/authController');
const auth = require('../middleware/auth.js')
test
router.use(
    cors({
        credentials:true,
        origin:"http://localhost:5173"
    })
)

router.get('/',test)
router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/profile',auth,getprofile)
module.exports = router
