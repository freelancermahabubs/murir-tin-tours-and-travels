import { Router } from 'express'
import routes from '../constants/route.constants'

const globalRoute = Router()

routes.forEach(route => globalRoute.use(route.path, route.route))

export default globalRoute
