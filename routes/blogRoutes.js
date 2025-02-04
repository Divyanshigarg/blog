const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')
const auth = require('../middleware/auth')

router.post('/create', auth, blogController.createBlog)
router.put('/update/:blogId', auth, blogController.updateBlog)
router.delete('/delete/:blogId', auth, blogController.deleteBlog)
router.get('/get/:blogId',  blogController.getBlog)
router.get('/all',  blogController.getAllBlogs)

module.exports = router