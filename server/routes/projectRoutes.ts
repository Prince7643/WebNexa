import express from 'express'
import { protect } from '../controllers/middlewears/auth.js'
import { deleteProject, getProjectPreview, getPublishedProject, getSingleProject, makeRevision, rollbackToVersion, saveProjectCode } from '../controllers/projectController.js'
 
const projectRouter = express.Router()

projectRouter.post('/revision/:projectId',protect,makeRevision)
projectRouter.post('/save/:projectId',protect,saveProjectCode)
projectRouter.post('/rollback/:projectId/:versionId',protect,rollbackToVersion)
projectRouter.post('/preview/:projectId',protect,getProjectPreview)
projectRouter.post('/published',getPublishedProject)


projectRouter.post('/:projectId',protect,deleteProject)
projectRouter.post('/published/:projectId',protect,getSingleProject)

export default projectRouter

