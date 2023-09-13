const express = require('express'); 
const {createBlog,getBlogs, getBlog, updateBlog, deleteBlog} = require('../controllers/blogEntries');
const { verifyToken } = require("../middlewares/verifyToken");


const upload = require("../middlewares/multer-upload");
const handlePostCreation = require("../middlewares/handlePostCreation");
const { cloudinaryUpload } = require("../middlewares/cloudinary-upload");
const { authorize } = require("../middlewares/authorize");

const blogsRouter = express.Router();

blogsRouter.post('/create', verifyToken, authorize('admin'), upload.single('blogImage'), cloudinaryUpload, handlePostCreation, createBlog);

blogsRouter.get('/read', getBlogs);
blogsRouter.get('/read/:id', getBlog);

blogsRouter.put('/update/:id', updateBlog);

blogsRouter.delete('/delete/:id', deleteBlog);


module.exports = blogsRouter;