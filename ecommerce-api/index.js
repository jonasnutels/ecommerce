const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json('E-Commerce  teste' )
  })

  app.get('/categorias', db.getCategorias)
  app.post('/create', db.createCategoria)
  app.delete('/categoria/:id', db.deleteCategoria)
  app.post('/registro', db.createUsuario)





  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })