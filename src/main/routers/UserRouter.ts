import {Router} from 'express'
import { addUserEndpoint, loginUserEndpoint } from '../controllers/UserController.js'

export const userRouter:Router=Router()

userRouter.post('/addUser',addUserEndpoint);
userRouter.post('/login',loginUserEndpoint)


