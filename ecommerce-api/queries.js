const Pool = require('pg').Pool

const pool = new Pool({
  host: '100.24.43.90',
  database: 'postgres',
  user: 'aps_ecommerce',
  password: 'aps_ecommerce',
  port: 5432,
})

const getCategorias = (request, response) => {
  pool.query('SELECT * FROM ecommerce.produto_categoria ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const createUsuario = (request, response) => {
  const { nome, email, password } = request.body
  pool.query('INSERT INTO ecommerce.usuario (nome, email, password) VALUES ($1,$2,$3) RETURNING *', [nome, email, password]), (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Usuário criado com ID: ${results.rows[0].id}`)
  }
}
const createCategoria = (request, response) => {
  const { descricao = "teste id 16" } = request.body

  pool.query('INSERT INTO ecommerce.produto_categoria (descricao) VALUES ($1) RETURNING *', [descricao], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`produto_Categoria added with ID: ${results.rows[0].id}`)
  })
}

const deleteCategoria = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM ecommerce.produto_categoria WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(202).send(`Produto_categoria deleted with ID: ${id}`)
  })
}


module.exports = {
  getCategorias,
  createCategoria,
  deleteCategoria,
  createUsuario,
}