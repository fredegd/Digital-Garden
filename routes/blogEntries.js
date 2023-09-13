const express = require('express'); 
const {createBlog,getBlogs, getBlog, updateBlog, deleteBlog} = require('../controllers/blogEntries');
const { verifyToken } = require("../middlewares/verifyToken");


const upload = require("../middlewares/multer-upload");
const handlePostCreation = require("../middlewares/handlePostCreation");
const { cloudinaryUpload } = require("../middlewares/cloudinary-upload");
const { authorize } = require("../middlewares/authorize");

const blogsRouter = express.Router();

blogsRouter.post('/', verifyToken, authorize('admin'), upload.single('blogImage'), cloudinaryUpload, handlePostCreation, createBlog);

blogsRouter.get('/', getBlogs);
blogsRouter.get('/:id', getBlog);

blogsRouter.put('/:id', updateBlog);

blogsRouter.delete('/:id', deleteBlog);


module.exports = blogsRouter;