import express from "express";
import { protect } from "../controllers/middlewears/auth.js";
import { createUserProject, getUserCredits, getUserProject, getUserProjects, purchaseCredits, togglePublishProject } from "../controllers/userController.js";

const userRouter =express.Router();

userRouter.get('/credits',protect,getUserCredits)
userRouter.post('/project',protect,createUserProject)
userRouter.get('/project/:projectId', protect, getUserProject)
userRouter.get('/projects',protect,getUserProjects)
userRouter.post('/publish-toggle/:projectId',protect,togglePublishProject)
userRouter.post('/purchase-credits',protect,purchaseCredits)

export default userRouter;