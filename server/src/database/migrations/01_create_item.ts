import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('item', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title', 50).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTableIfExists('item');
}