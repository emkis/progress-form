exports.up = function(knex) {
  return knex.schema.createTable('results', table => {
    table.increments()

    table.integer('realistic').notNullable()
    table.integer('investigative').notNullable()
    table.integer('entrepreneur').notNullable()
    table.integer('conventional').notNullable()
    table.integer('artistic').notNullable()
    table.integer('social').notNullable()

    table.string('person_id').notNullable()
    table.foreign('person_id').references('id').inTable('people')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('results')
}
