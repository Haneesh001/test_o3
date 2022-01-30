const Knex = require('knex')
const config = require('./config').db

//check logic for env is in prod or

if (process.env.NODE_ENV === 'production') {
  config.host = 'localhost'
} else {
  config.host = 'localhost'
}

// Knex.QueryBuilder.extends
const knex = Knex({
  client: 'pg',
  connection: config,
})

const { attachPaginate } = require('knex-paginate')

if (!knex.queryBuilder().paginate) {
  attachPaginate()
}

module.exports = knex
