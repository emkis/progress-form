import express from 'express'

import PersonController from './controllers/PersonController'
import ResultController from './controllers/ResultController'

import { PersonValidator } from './validators/PersonValidator'
import { ResultValidator } from './validators/ResultValidator'

const routes = express.Router()

routes.post('/create-person', PersonValidator, PersonController.store)
routes.post('/store-result/:id', ResultValidator, ResultController.store)

export default routes
