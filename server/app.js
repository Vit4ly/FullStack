import express from 'express'
import mongoose from "mongoose";
import {registerValidation} from './validations/auth.js'
import checkAuth from "./utils/checkAuth.js";
import {getMe, register, login} from './controllers/UserController.js'

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

app.post('/register', registerValidation, register)

app.post('/login', login )

app.get('/auth/me', checkAuth, getMe)

