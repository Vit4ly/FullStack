import express from 'express'
import mongoose from "mongoose";
import multer from 'multer'
import {registerValidation, loginValidation, postCreateValidation} from './validations/validation.js'
import {PostController, UserController} from './controllers/index.js'
import {checkAuth, HandleValidationErrors} from './utils/index.js'

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

app.use(express.json())
app.use('/uploads', express.static('uploads'))

mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.vb7dq.mongodb.net/todo?retryWrites=true&w=majority')
    .then(() => console.log('DB Ok'))
    .catch(() => console.log('DB Error'))

app.get('/', (req, res) => {
    res.send('Test')
})

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})
app.post('/register', registerValidation, HandleValidationErrors, UserController.register)
app.post('/login', loginValidation, HandleValidationErrors, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, HandleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, HandleValidationErrors, PostController.update)

app.listen(5000, () => {
    console.log('server is listening on port 5000')
})
