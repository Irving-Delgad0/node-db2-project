const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where('id', id).first()
}

const create = (car) => {
  return db('cars').insert(car)
  .then(result => {
    return getById(result[0])
  })
}

const findByValue = (column, value) => {
  return db('cars').where(column, value)
}

module.exports = {
  getAll,
  getById,
  create,
  findByValue
}