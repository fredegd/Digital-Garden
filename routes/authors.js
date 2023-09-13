const express = require('express'); 

const{createAuthor, getAuthors, getAuthor, updateAuthor, deleteAuthor} = require('../controllers/authors');

const{verifyToken} = require('../middlewares/verifyToken');
const{authorize} = require('../middlewares/authorize');
const{isAccountOwner} = require('../middlewares/isAccountOwner');
const{cloudinaryUpload}= require('../middlewares/cloudinary-upload');
const{cloudinaryDelete}= require('../middlewares/cloudinary-delete');

const upload = require('../middlewares/multer-upload');

const authorRouter = express.Router();

authorRouter.post('/create', upload.single('profilePicture'), cloudinaryUpload, createAuthor);

authorRouter.get('/', getAuthors);
authorRouter.get('/:id', verifyToken, isAccountOwner,   getAuthor);

authorRouter.put('/:id', updateAuthor);

authorRouter.delete('/:id', deleteAuthor);

module.exports = authorRouter;
