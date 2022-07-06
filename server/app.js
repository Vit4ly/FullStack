import express from 'express'
import mongoose from "mongoose";
import {registerValidation, loginValidation, postCreateValidation} from './validations/validation.js'
import checkAuth from "./utils/checkAuth.js";
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'

const app = express();
app.use(express.json())

mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.vb7dq.mongodb.net/todo?retryWrites=true&w=majority')
    .then(() => console.log('DB Ok'))
    .catch(() => console.log('DB Error'))

app.listen(5000, () => {
    console.log('server is listening on port 5000')
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/register', registerValidation, UserController.register)

app.post('/login',loginValidation, UserController.login )

app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.delete('/posts/:id',checkAuth, PostController.remove)
app.patch('/posts/:id',checkAuth, PostController.update)


