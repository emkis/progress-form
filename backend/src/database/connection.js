import knex from 'knex'

import knexConfiguration from '../../knexfile'

const config = knexConfiguration.development

const database = knex(config)

export default database
