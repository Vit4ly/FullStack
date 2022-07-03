import {body} from 'express-validator'

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Не верный пароль').isLength({min: 5}),
    body('fullName', 'Не верное имя').isLength({min: 3}),
    body('avatarUrl', 'Не верная ссылка на аватар').optional().isURL(),

]
