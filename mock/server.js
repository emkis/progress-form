const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const { resolve } = require('path')
const router = jsonServer.router(resolve(__dirname, 'database.json'))
const port = process.env.PORT || 3333

const routes = require('./routes.json')

server.use(middlewares)
server.use(jsonServer.rewriter(routes))
server.use(router)

server.listen(port)
