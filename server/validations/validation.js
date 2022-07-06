import {body} from 'express-validator'

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Не верный пароль').isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Не верный пароль').isLength({min: 5}),
    body('fullName', 'Не верное имя').isLength({min: 3}),
    body('avatarUrl', 'Не верная ссылка на аватар').optional().isURL(),

]

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({min: 5}).isString(),
    body('text', 'Введите текст статьи').isLength({min: 5}).isString(),
    body('tags', 'Не верный формат тэгов (укажите массив)').optional().isString(),
    body('imageUrl', 'Не верная ссылка на изображение').optional().isString(),

]

