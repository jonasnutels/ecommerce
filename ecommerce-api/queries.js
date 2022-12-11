const Pool = require('pg').Pool

const pool = new Pool({
    host: '100.24.43.90',
    database: 'postgres',
    user: 'aps_ecommerce',
    password: 'aps_ecommerce',
    port: 5432,
})

const getCategorias = (request, response) => {
    pool.query('SELECT * FROM ecommerce.categorias ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const createCategoria = (request, response) => {
    const { descricao = "teste" } = request.body
  
    pool.query('INSERT INTO ecommerce.categorias (descricao) VALUES ($1) RETURNING *', [descricao], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Categorias added with ID: ${results.rows[0].id}`)
    })
  }


  module.exports = {
    getCategorias,
    createCategoria,
  }