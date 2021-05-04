import express, { Router } from "express";
import { UserController } from 'controllers/user.controller';

const userRouter: Router = Router();

userRouter.post('/', UserController.create);
userRouter.get('/:id?', UserController.get);
userRouter.put('/:id',UserController.update);
userRouter.delete('/:id', UserController.delete);

export default userRouter;