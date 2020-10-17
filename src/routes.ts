import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import AcademysController from './controllers/AcademysController'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/academys', AcademysController.index) 
routes.get('/academys/:id', AcademysController.show)
routes.post('/academys', upload.array('images'), AcademysController.create)  

export default routes